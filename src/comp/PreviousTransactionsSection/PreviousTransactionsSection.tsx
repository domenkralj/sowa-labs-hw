import {Button, DeviceEventEmitter, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {appColors} from '../../utils/global';
import AppText from '../AppText/AppText';
import PreviousTransaction from './comp/PreviousTransaction/PreviousTransaction';
import {NativeModules} from 'react-native';
import { useEffect } from 'react';

const PreviousTransactionsSection = () => {
  const isEmpty = false
  const {BitconRetrieverModule} = NativeModules;

  useEffect(() => {
    const priceListener = DeviceEventEmitter.addListener(
      'bitcoinPriceUpdated',
      (bitcoinPrice) => {
        console.log("Here working")
        ToastAndroid.show('A pikachu appeared nearby !' + bitcoinPrice, ToastAndroid.SHORT);
      }
    );
  }, [])

  return (
    <View style={styles.outterContainer}>
      <View style={styles.contentContainer}>
        {
          !isEmpty ?
          <>
          <Button 
            title='test'
            onPress={() => {
              BitconRetrieverModule.sayHello('testName', 'testLocation');
            }}
          />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
            <PreviousTransaction />
          </>
          :
          <AppText style={styles.emptyTransactionsText}>
            No transactions yet 📋 {`\n`}
            Here all your past transactions will be displayed 🚀.
          </AppText>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outterContainer: {
    paddingInline: 24,
    paddingBlock: 16
  },
  contentContainer: {
    backgroundColor: appColors.lightGray,
    paddingInline: 14,
    paddingBlock: 18,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyTransactionsText: {
    fontSize: 12,
    textAlign: 'center',
  }
});

export default PreviousTransactionsSection;
