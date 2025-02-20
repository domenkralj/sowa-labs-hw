import {StyleSheet, View} from 'react-native';
import BisonIcon from '../BisonIcon/BisonIcon';
import AppText from '../AppText/AppText';

const IosNotSupportedScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <BisonIcon />
      <AppText style={styles.alertMainText}>
        🛑 Ios devices are not supported.🛑
      </AppText>
      <AppText style={styles.alertDescriptionText}>
        Due to homework instructions (data is fetched in android module).
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingInline: 20,
  },
  alertMainText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 600,
  },
  alertDescriptionText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 600,
  },
});

export default IosNotSupportedScreen;
