import {StyleSheet, Text, View} from 'react-native';
import AppText from '../../../AppText/AppText';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  textItem: {
    textAlign: "right"
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const RightInfoData = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.textItem}>Availble</AppText>
      <AppText style={styles.textItem}>Second text</AppText>
      <AppText style={styles.textItem}>Third text</AppText>
    </View>
  );
};

export default RightInfoData;
