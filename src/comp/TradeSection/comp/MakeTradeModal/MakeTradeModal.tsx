import {Modal, StyleSheet, View} from 'react-native';
import MakeTrade from './comp/MakeTrade/MakeTrade';
import CloseModalButton from './comp/CloseModalButton/CloseModalButton';

interface IMakeTradeModal2Props {
  isOpen: boolean;
  onDismiss: () => void;
}

const MakeTradeModal = (props: IMakeTradeModal2Props) => {
  return (
    <Modal
      visible={props.isOpen}
      animationType="fade"
      statusBarTranslucent
      transparent
      onRequestClose={props.onDismiss}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View style={styles.topCloseContainer}>
              <CloseModalButton onPress={props.onDismiss} />
            </View>
            <MakeTrade onDismiss={props.onDismiss} />
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
    width: 'auto',
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
