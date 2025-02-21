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
import NumberInput from './comp/NumberInput/NumberInput';
import BuySellButtons from './comp/BuySellButtons/BuySellButtons';
import ErrorMessage from './comp/ErrorMessage/ErrorMessage';

interface IMakeTradeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const MakeTradeModal = (props: IMakeTradeModalProps) => {
  const [eurTradeValue, setEurTradeValue] = useState<number | undefined>(
    undefined,
  );
  const [btcTradeValue, setBtcTradeValue] = useState<number | undefined>(
    undefined,
  );

  const [error, setError] = useState<string | undefined>("Not enough bitcoin to buy. Please add more bitcoins.")

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
                <NumberInput
                  value={eurTradeValue}
                  onValueChange={setEurTradeValue}
                />
                <NumberInput
                  value={eurTradeValue}
                  onValueChange={setEurTradeValue}
                />
              </View>
              { error && <ErrorMessage message={error} />}
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
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    width: 'auto'
  },
});

export default MakeTradeModal;
