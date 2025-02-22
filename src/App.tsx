import React from 'react';
import {
  Platform
} from 'react-native';
import TopSection from './comp/TopSection/TopSection';
import TradeSection from './comp/TradeSection/TradeSection';
import PreviousTransactionsSection from './comp/PreviousTransactionsSection/PreviousTransactionsSection';
import LoadingSplashScreen from './comp/LoadingSplashScreen/LoadingSplashScreen';
import AppNotSupportedScreen from './comp/AppNotSupportedScreen/AppNotSupportedScreen';
import useAndroidBtcRetrieverModuleHandler from './hooks/useAndroidBtcRetrieverModuleHandler/useAndroidBtcRetrieverModuleHandler';
import useBtcData from './hooks/useBtcData/useBtcData';
import AppProviders from './comp/AppProviders/AppProviders';
import BitcoinGraphSection from './comp/BitcoinGraphSection/BitcoinGraphSection';
import BitcoinPriceTextsSection from './comp/BitcoinPriceTextsSection/BitcoinPriceTextsSection';
import BtcLoadingErrorScreen from './comp/BtcLoadingErrorScreen/BtcLoadingErrorScreen';
import AppLayout from './comp/AppLayout/AppLayout';

const App = () => {
  return (
    <AppProviders>
      <AppLayout>
        {Platform.OS === 'android' ? <AppContent /> : <AppNotSupportedScreen />}
      </AppLayout>
    </AppProviders>
  );
};

const AppContent = () => {
  useAndroidBtcRetrieverModuleHandler();
  const btcData = useBtcData();

  if (btcData.error) return <BtcLoadingErrorScreen />;
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

export default App;
