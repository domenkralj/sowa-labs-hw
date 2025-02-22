import {StyleSheet, View} from 'react-native';
import AppText from '../../../AppText/AppText';
import {
  formatCashNumber,
  formatTime,
  ITradeItem,
} from '../../../../utils/utils';
import {round} from 'lodash';

type TPreviousTransactionProps = {
  trade: ITradeItem;
};

const PreviousTransaction = (props: TPreviousTransactionProps) => {
  const buySellText = (() => {
    if (props.trade.isInitalTransaction) return 'Gift';
    if (props.trade.boughtBtc) return 'Buy';
    return 'Sell';
  })();

  return (
    <View style={styles.mainContainer}>
      <AppText style={styles.descriptionText}>{buySellText}</AppText>
      <AppText style={styles.mainText}>
        {props.trade.boughtBtc ? '+' : '-'}
        {round(props.trade.btcVolume, 6)} BTC /
        {props.trade.boughtBtc ? ' -' : ' +'}
        {formatCashNumber(props.trade.eurVolume)} €
      </AppText>
      <AppText style={styles.descriptionText}>{formatTime(props.trade.timestamp)}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  mainText: {
    fontSize: 12,
    fontWeight: 600,
  },
  descriptionText: {
    fontSize: 12,
  },
});

export default PreviousTransaction;
