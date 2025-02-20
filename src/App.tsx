import React from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import TopSection from './comp/TopSection/TopSection';
import GraphSection from './comp/GraphSection/GraphSection';
import TradeSection from './comp/TradeSection/TradeSection';
import PreviousTransactionsSection from './comp/PreviousTransactionsSection/PreviousTransactionsSection';
import LoadingSplashScreen from './comp/LoadingSplashScreen/LoadingSplashScreen';
import IosNotSupportedScreen from './comp/IosNotSupportedScreen/IosNotSupportedScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.mainSafeAreaView}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        style={styles.mainScrollView}
        contentInsetAdjustmentBehavior="automatic">
        <View style={styles.mainView}>
          <AppContent />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AppContent = () => {
  const isLoading = false;

  if (Platform.OS === 'ios') return <IosNotSupportedScreen />
  if (isLoading) return <LoadingSplashScreen />;

  return (
    <>
      <TopSection />
      <GraphSection />
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
