import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import {isNumber} from 'lodash';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import BuySellButtons from '../BuySellButtons/BuySellButtons';
import useBtcData from '../../../../../../hooks/useBtcData/useBtcData';
import NumberInput from '../NumberInput/NumberInput';

interface IMakeTradeProps {
  onDismiss: () => void;
}

const MakeTrade = (props: IMakeTradeProps) => {
  const {currentBtcPrice} = useBtcData();

  const [eurValueString, setEurValueString] = useState<string>('');
  const [btcValueString, setBtcValueString] = useState<string>('');

  const clearedEurValueString = eurValueString.replaceAll(/[,]/g, '')
  const clearedBtcValueString = btcValueString.replaceAll(/[,]/g, '')

  const [error, setError] = useState<string | undefined>(undefined);

  const isEurValueStringValid = (() => {
    const num = Number(clearedEurValueString);

    if (!isNumber(num)) return false;
    if (isNaN(num)) return false;
    return true;
  })();

  const isBtcValueStringValid = (() => {
    const num = Number(clearedBtcValueString);

    if (!isNumber(num)) return false;
    if (isNaN(num)) return false;
    return true;
  })();

  const eurValueNum = isEurValueStringValid
    ? Number(clearedEurValueString)
    : undefined;
  const btcValueNum = isBtcValueStringValid
    ? Number(clearedBtcValueString)
    : undefined;

  const handleOnEurChangeValue = (newValue: string) => {
    setEurValueString(newValue);

    const newValueNum = Number(newValue.replaceAll(/[,]/g, ''));

    if (!isNumber(newValueNum) || isNaN(newValueNum)) {
      setBtcValueString('');
      return;
    }
    setBtcValueString(String(newValueNum / currentBtcPrice!));
  };

  const handleOnBtcChangeValue = (newValue: string) => {
    setBtcValueString(newValue);

    const newValueNum = Number(newValue.replaceAll(/[,]/g, ''));

    if (!isNumber(newValueNum) || isNaN(newValueNum)) {
      setEurValueString('');
      return;
    }

    setEurValueString(String(currentBtcPrice! * newValueNum));
  };

  // If the price changes while the modal is open and values are already entered in the inputs,
  // recalculate the values accordingly.
  useEffect(() => {
    if (isEurValueStringValid && isBtcValueStringValid) {
      setBtcValueString(String(eurValueNum! / currentBtcPrice!));
    }
  }, [currentBtcPrice]);

  useEffect(() => {
    setError(undefined);
  }, [eurValueString, btcValueNum, currentBtcPrice]);

  return (
    <View style={styles.container}>
      <View style={styles.inputsBox}>
        <NumberInput
          label="EUR"
          value={eurValueString}
          onChangeValue={handleOnEurChangeValue}
        />
        <NumberInput
          label="BTC"
          value={btcValueString}
          onChangeValue={handleOnBtcChangeValue}
        />
        {error && <ErrorMessage message={error} />}
        <BuySellButtons
          eurTradeValue={eurValueNum}
          btcTradeValue={btcValueNum}
          onSellOrBought={() => {
            setEurValueString('');
            setBtcValueString('');
            props.onDismiss();
          }}
          onError={newError => setError(newError)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    minWidth: '100%',
  },
  inputsBox: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: 'auto',
  },
});

export default MakeTrade;
