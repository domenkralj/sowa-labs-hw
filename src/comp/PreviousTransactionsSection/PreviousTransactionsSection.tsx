import {
  StyleSheet,
  View,
} from 'react-native';
import {appColors} from '../../utils/utils';
import AppText from '../AppText/AppText';
import PreviousTransaction from './comp/PreviousTransaction/PreviousTransaction';
import useTrades from '../../hooks/useTrades/useTrades';

const PreviousTransactionsSection = () => {
  const {previousTrades} = useTrades();
  const noPreviousTransactions = previousTrades?.length === 0;

  return (
    <View style={styles.outterContainer}>
      <View style={styles.contentContainer}>
        {!noPreviousTransactions ? (
          <>
            {[...previousTrades].reverse().map((trade, i) => (
              <PreviousTransaction key={i} trade={trade} />
            ))}
          </>
        ) : (
          <AppText style={styles.emptyTransactionsText}>
            No transactions yet 📋 {`\n`}
            Here all your past transactions will be displayed 🚀.
          </AppText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    paddingInline: 24,
    paddingBlock: 16,
  },
  contentContainer: {
    backgroundColor: appColors.lightGray,
    paddingInline: 14,
    paddingBlock: 18,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4
  },
  emptyTransactionsText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default PreviousTransactionsSection;
