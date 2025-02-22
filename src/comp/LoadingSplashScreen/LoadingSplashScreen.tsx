import {ActivityIndicator, StyleSheet, View} from 'react-native';
import AppText from '../AppText/AppText';
import BisonIcon from '../BisonIcon/BisonIcon';
import { appColors } from '../../utils/utils';

const LoadingSplashScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <BisonIcon />
      <AppText style={styles.motoText}>Simple, smart and reliable with BISON.</AppText>
      <ActivityIndicator color={appColors.bisonDarkBlue} />
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
  },
  motoText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 600
  }
});

export default LoadingSplashScreen;
