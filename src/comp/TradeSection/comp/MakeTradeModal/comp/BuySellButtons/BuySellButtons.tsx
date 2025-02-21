import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../../../../../utils/global';
import AppText from '../../../../../AppText/AppText';

const BuySellButtons = () => {
  
  const onSell = () => {}

  const onBuy = () => {}

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        accessibilityLabel="Buy Bitcoin"
        onPress={onBuy}
        style={styles.buySellButton}>
        <AppText style={styles.buySellText}>Buy</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel="Sell bitcoin"
        onPress={onSell}
        style={styles.buySellButton}>
        <AppText style={styles.buySellText}>Sell</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '100%'
  },
  buySellButton: {
    flex: 1,
    backgroundColor: appColors.bisonDarkBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    paddingBlock: 14
  },
  buySellText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 16
  }
});

export default BuySellButtons;
