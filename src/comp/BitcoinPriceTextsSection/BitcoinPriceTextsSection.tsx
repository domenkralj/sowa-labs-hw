import {StyleSheet, View} from 'react-native';
import AppText from '../AppText/AppText';
import useBtcData from '../../hooks/useBtcData/useBtcData';
import { appColors, formatCashNumber } from '../../utils/utils';
import usePnL from './hooks/usePnL/usePnL';

const BitcoinPriceTextsSection = () => {
  const { currentBtcPrice } = useBtcData()
  const pnl = usePnL()

  return (
    <View style={styles.container}>
      <AppText style={styles.btcText}>BTC {'\n'} {formatCashNumber(currentBtcPrice || 0)} €</AppText>
      <AppText style={styles.pnlText}>
        PnL: {` `}
        <AppText style={[styles.pnlValueText, { color: pnl >= 0 ? appColors.lightGreen : appColors.red }]}>
          {formatCashNumber(pnl)} €
          </AppText>
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
    fontWeight: 600
  },
});

export default BitcoinPriceTextsSection;
