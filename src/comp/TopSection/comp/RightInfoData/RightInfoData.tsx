import {StyleSheet, Text, View} from 'react-native';
import AppText from '../../../AppText/AppText';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  textItem: {
    textAlign: 'right',
    lineHeight: 16
  },
  textItemBold: {
    fontWeight: 600,
  }
});

const RightInfoData = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.textItem}>Available</AppText>

      <AppText style={styles.textItem}>
        0.12345678{' '}
        <AppText style={styles.textItemBold}>BTC</AppText>
      </AppText>

      <AppText style={styles.textItem}>
        224,01{' '}
        <AppText style={styles.textItemBold}>€</AppText>
      </AppText>
    </View>
  );
};

export default RightInfoData;
