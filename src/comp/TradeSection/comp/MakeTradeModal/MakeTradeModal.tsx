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
import { useState } from 'react';
import NumberInput from './comp/NumberInput/NumberInput';

interface IMakeTradeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

const MakeTradeModal = (props: IMakeTradeModalProps) => {
  const [eurTradeValue, setEurTradeValue] = useState<number | undefined>(undefined)
  const [btcTradeValue, setBtcTradeValue] = useState<number | undefined>(undefined)

  if (!props.isOpen) return null;

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
              <CloseModalButton onPress={() => props.onDismiss()}/>
            </View>
          </View>

          <NumberInput
            value={eurTradeValue}
            onValueChange={setEurTradeValue}
          />
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
    minWidth: 200
  },
  topCloseContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%'
  }
});

export default MakeTradeModal;
