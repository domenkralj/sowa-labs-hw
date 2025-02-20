import {StyleSheet, View} from 'react-native';
import AppText from '../../../AppText/AppText';
import useBtcData from '../../../../hooks/useBtcData/useBtcData';
import { round } from 'lodash'

const TopBitcoinPriceTexts = () => {
  const { currentBtcPrice } = useBtcData()

  return (
    <View style={styles.container}>
      <AppText style={styles.btcText}>BTC {'\n'} {round(currentBtcPrice!!, 2)} €</AppText>
      <AppText style={styles.pnlText}>
        PnL: <AppText style={styles.pnlValueText}>+12.3 €</AppText>
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btcText: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: 'center',
  },
  pnlText: {
    fontSize: 12,
    fontWeight: 600,
    marginTop: 6
  },
  pnlValueText: {
    color: '#00BF13',
    fontWeight: 600,
  },
});

export default TopBitcoinPriceTexts;
