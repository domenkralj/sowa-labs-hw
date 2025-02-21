import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TopSection from './comp/TopSection/TopSection';
import TradeSection from './comp/TradeSection/TradeSection';
import PreviousTransactionsSection from './comp/PreviousTransactionsSection/PreviousTransactionsSection';
import LoadingSplashScreen from './comp/LoadingSplashScreen/LoadingSplashScreen';
import IosNotSupportedScreen from './comp/IosNotSupportedScreen/IosNotSupportedScreen';
import useAndroidBtcRetrieverModuleHandler from './hooks/useAndroidBtcRetrieverModuleHandler/useAndroidBtcRetrieverModuleHandler';
import useBtcData from './hooks/useBtcData/useBtcData';
import AppProviders from './comp/AppProviders/AppProviders';
import BitcoinGraphSection from './comp/BitcoinGraphSection/BitcoinGraphSection';
import BitcoinPriceTextsSection from './comp/BitcoinPriceTextsSection/BitcoinPriceTextsSection';
import BtcLoadingErrorScreen from './comp/BtcLoadingErrorScreen/BtcLoadingErrorScreen';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  return (
    <SafeAreaView style={styles.mainSafeAreaView}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        style={styles.mainScrollView}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.mainView}>{props.children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const App = () => {
  if (Platform.OS === 'ios')
    return (
      <AppLayout>
        <IosNotSupportedScreen />
      </AppLayout>
    );

  return (
    <AppProviders>
      <AppLayout>
        <AppContent />
      </AppLayout>
    </AppProviders>
  );
};

const AppContent = () => {
  useAndroidBtcRetrieverModuleHandler();
  const btcData = useBtcData();

  if (btcData.error) return <BtcLoadingErrorScreen />
  if (!btcData.btcPrices) return <LoadingSplashScreen />;

  return (
    <>
      <TopSection />
      <BitcoinPriceTextsSection />
      <BitcoinGraphSection />
      <TradeSection />
      <PreviousTransactionsSection />
    </>
  );
};

const styles = StyleSheet.create({
  mainSafeAreaView: {
    backgroundColor: Colors.white,
  },
  mainScrollView: {
    height: '100%',
  },
  mainView: {
    backgroundColor: Colors.white,
    minHeight: '100%',
  },
});

export default App;
