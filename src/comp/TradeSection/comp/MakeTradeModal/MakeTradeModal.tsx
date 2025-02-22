import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CloseModalButton from './comp/CloseModalButton/CloseModalButton';
import {useState} from 'react';
import BuySellButtons from './comp/BuySellButtons/BuySellButtons';
import ErrorMessage from './comp/ErrorMessage/ErrorMessage';
import EurInput from './comp/EurInput/EurInput';
import BtcInput from './comp/BtcInput/BtcInput';
import { formatCashNumber } from '../../../../utils/global';
import { isNumber } from 'lodash';
import useBtcData from '../../../../hooks/useBtcData/useBtcData';

interface IMakeTradeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const MakeTradeModal = (props: IMakeTradeModalProps) => {
  const {currentBtcPrice} = useBtcData()

  const [eurTradeValue, setEurTradeValue] = useState<string>("");
  const [btcTradeValue, setBtcTradeValue] = useState<string>("");

  const isEurTradeValueInValidFormat = isNumber(Number(eurTradeValue)) && !isNaN(Number(eurTradeValue))
  const isBtcTradeValueInValidFormat = isNumber(Number(btcTradeValue)) && !isNaN(Number(btcTradeValue))

  const [error, setError] = useState<string | undefined>(undefined)
  

  const onEurTradeValueChange = (newValue: string) => {    
    const cleanedValue = newValue.replace(/[^0-9.,]/g, '');

    if (!cleanedValue) {
      setEurTradeValue("")
      setBtcTradeValue("")
      return
    }

    setEurTradeValue(cleanedValue)
    const numValue = Number(cleanedValue.replace(/[.,]/g, ""))

    setBtcTradeValue(String(numValue / currentBtcPrice!))
  }

  const onBtcTradeValueChange = (newValue: string) => {
    const cleanedValue = newValue.replace(/[^0-9.,]/g, '');

    if (!cleanedValue) {
      setEurTradeValue("")
      setBtcTradeValue("")
      return
    }

    setBtcTradeValue(cleanedValue)
    const numValue = Number(cleanedValue.replace(/[.,]/g, ""))

    setEurTradeValue(String(currentBtcPrice! * numValue))
  }

  const onEurTradeValueBlur = () => {
    console.log("onEurTradeValueBlur")
  }

  const onBtcTradeValueBlur = () => {
    console.log("onBtcTradeValueBlur")
  }

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
                  value={eurTradeValue}
                  onChangeValue={onEurTradeValueChange}
                  onBlur={onEurTradeValueBlur}
                  isError={!isEurTradeValueInValidFormat}
                />
                <BtcInput 
                  value={btcTradeValue}
                  onChangeValue={onBtcTradeValueChange}
                  onBlur={onBtcTradeValueBlur}
                  isError={!isBtcTradeValueInValidFormat}
                />
              </View>
              { error && <ErrorMessage message={error} />}
              { !isEurTradeValueInValidFormat && <ErrorMessage message="Please enter a valid EUR value." /> }
              { !isBtcTradeValueInValidFormat && <ErrorMessage message="Please enter a valid BTC value." /> }
              <BuySellButtons />
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
    width: '100%'
  },
  btcEurInputBox: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: 'auto'
  },
});

export default MakeTradeModal;
