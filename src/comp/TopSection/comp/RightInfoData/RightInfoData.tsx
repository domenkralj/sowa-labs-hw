import {StyleSheet, View} from 'react-native';
import AppText from '../../../AppText/AppText';
import useTrades from '../../../../hooks/useTrades/useTrades';
import {round} from 'lodash';
import {formatCashNumber} from '../../../../utils/utils';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  textItem: {
    textAlign: 'right',
    lineHeight: 16,
  },
  textItemBold: {
    fontWeight: 600,
  },
});

const RightInfoData = () => {
  const {currentBtc, currentEur} = useTrades();

  return (
    <View style={styles.container}>
      <AppText style={styles.textItem}>Available</AppText>

      <AppText style={styles.textItem}>
        {`${round(currentBtc, 8)} `}
        <AppText style={styles.textItemBold}>BTC</AppText>
      </AppText>

      <AppText style={styles.textItem}>
        {`${formatCashNumber(currentEur)} `}
        <AppText style={styles.textItemBold}>€</AppText>
      </AppText>
    </View>
  );
};

export default RightInfoData;
