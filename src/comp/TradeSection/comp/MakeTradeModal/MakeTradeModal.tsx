import {Modal, StyleSheet, View} from 'react-native';
import CloseModalButton from './comp/CloseModalButton/CloseModalButton';
import {useEffect, useState} from 'react';
import BuySellButtons from './comp/BuySellButtons/BuySellButtons';
import ErrorMessage from './comp/ErrorMessage/ErrorMessage';
import EurInput from './comp/EurInput/EurInput';
import BtcInput from './comp/BtcInput/BtcInput';
import {isNumber} from 'lodash';
import useBtcData from '../../../../hooks/useBtcData/useBtcData';
import Toast from 'react-native-toast-message';

interface IMakeTradeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const MakeTradeModal = (props: IMakeTradeModalProps) => {
  const {currentBtcPrice} = useBtcData();

  const [eurTradeValueString, setEurTradeValueString] = useState<string>('');
  const [btcTradeValueString, setBtcTradeValueString] = useState<string>('');

  const isEurTradeValueInValidFormat =
    isNumber(Number(eurTradeValueString)) &&
    !isNaN(Number(eurTradeValueString)) &&
    Number(btcTradeValueString) > 0;
  const isBtcTradeValueInValidFormat =
    isNumber(Number(btcTradeValueString)) &&
    !isNaN(Number(btcTradeValueString)) &&
    Number(btcTradeValueString) > 0;

  const eurTradeValueNum = isEurTradeValueInValidFormat
    ? Number(eurTradeValueString)
    : undefined;
  const btcTradeValueNum = isEurTradeValueInValidFormat
    ? Number(btcTradeValueString)
    : undefined;

  const [error, setError] = useState<string | undefined>(undefined);

  const onEurTradeValueChange = (newValue: string) => {
    setError(undefined);
    const cleanedValue = newValue.replace(/[^0-9.,]/g, '');

    if (!cleanedValue) {
      setEurTradeValueString('');
      setBtcTradeValueString('');
      return;
    }

    setEurTradeValueString(cleanedValue);
    const numValue = Number(cleanedValue.replace(/[.,]/g, ''));

    setBtcTradeValueString(String(numValue / currentBtcPrice!));
  };

  const onBtcTradeValueChange = (newValue: string) => {
    setError(undefined);
    const cleanedValue = newValue.replace(/[^0-9.,]/g, '');

    if (!cleanedValue) {
      setEurTradeValueString('');
      setBtcTradeValueString('');
      return;
    }

    setBtcTradeValueString(cleanedValue);
    const numValue = Number(cleanedValue.replace(/[,]/g, ''));

    setEurTradeValueString(String(currentBtcPrice! * numValue));
  };

  // If the price changes while the modal is open and values are already entered in the inputs,
  // recalculate the values accordingly.
  useEffect(() => {
    if (isEurTradeValueInValidFormat && isBtcTradeValueInValidFormat) {
      setBtcTradeValueString(String(eurTradeValueNum! / currentBtcPrice!));
    }
  }, [currentBtcPrice]);

  return (
    <Modal
      visible={props.isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent
      onRequestClose={() => props.onDismiss()}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View style={styles.topCloseContainer}>
              <CloseModalButton onPress={() => props.onDismiss()} />
            </View>
            <View style={styles.makeTransactionContainer}>
              <View style={styles.btcEurInputBox}>
                <EurInput
                  value={eurTradeValueString}
                  onChangeValue={onEurTradeValueChange}
                />
                <BtcInput
                  value={btcTradeValueString}
                  onChangeValue={onBtcTradeValueChange}
                />
              </View>
              {error && <ErrorMessage message={error} />}
              <BuySellButtons
                eurTradeValue={eurTradeValueNum}
                btcTradeValue={btcTradeValueNum}
                onSellOrBought={() => {
                  setEurTradeValueString('');
                  setBtcTradeValueString('');
                  props.onDismiss();
                }}
                onError={newError => setError(newError)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingInline: 24,
    paddingTop: 12,
    paddingBottom: 24,
    alignItems: 'center',
    elevation: 0,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 200,
  },
  topCloseContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
  },
  makeTransactionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 32,
    width: '100%',
  },
  btcEurInputBox: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: 'auto',
  },
});

export default MakeTradeModal;
