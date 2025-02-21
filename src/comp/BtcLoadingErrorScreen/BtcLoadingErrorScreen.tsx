import {
  ActivityIndicator,
  NativeModules,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppText from '../AppText/AppText';
import BisonIcon from '../BisonIcon/BisonIcon';
import {appColors} from '../../utils/global';
import {useState} from 'react';

const BtcLoadingErrorScreen = () => {
  const [loading, setLoading] = useState(false);
  const {BitconRetrieverModule} = NativeModules;

  const reloadBtcData = () => {
    setLoading(true);
    BitconRetrieverModule.getBitcoinPrice();

    setInterval(() => setLoading(false), 5000);
  };

  return (
    <View style={styles.mainContainer}>
      <BisonIcon />
      <AppText style={styles.motoText}>
        Simple, smart and reliable with BISON.
      </AppText>
      {!loading ? (
        <>
          <AppText style={styles.errorText}>
            🚨 Opsss, Something went wrong when trying to retieve data. 🚨
          </AppText>
          <TouchableOpacity
            disabled={loading}
            accessibilityLabel="Try loading again"
            onPress={reloadBtcData}
            style={styles.tryAgainButton}>
            <AppText style={styles.tryAgainText}>Try again 🔄</AppText>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator color={appColors.bisonDarkBlue} />
      )}
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
    fontWeight: 600,
  },
  errorText: {
    paddingInline: 20,
    textAlign: 'center',
  },
  tryAgainButton: {
    backgroundColor: appColors.bisonDarkBlue,
    borderRadius: 6,
  },
  tryAgainText: {
    color: 'white',
    fontWeight: 600,
    paddingInline: 16,
    paddingBlock: 8,
  },
});

export default BtcLoadingErrorScreen;
