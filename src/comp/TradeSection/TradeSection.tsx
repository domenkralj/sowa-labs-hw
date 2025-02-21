import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MakeTradeModal from './comp/MakeTradeModal/MakeTradeModal';
import {appColors} from '../../utils/global';
import {useState} from 'react';
import AppText from '../AppText/AppText';

const TradeSection = () => {
  const [isTradeModalOpen, setIsTradeModalOpen] = useState<boolean>(false);

  return (
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          accessibilityLabel="Open trade modal and start trading"
          onPress={() => setIsTradeModalOpen(true)}
          style={styles.tradeButton}>
          <AppText style={styles.tradeButtonText}>Trade</AppText>
        </TouchableOpacity>
      </View>
      <MakeTradeModal
        isOpen={isTradeModalOpen}
        onDismiss={() => setIsTradeModalOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 22,
    paddingInline: 24,
  },
  tradeButton: {
    backgroundColor: appColors.bisonDarkBlue,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeButtonText: {
    color: appColors.white,
    fontWeight: 600,
  },
});

export default TradeSection;
