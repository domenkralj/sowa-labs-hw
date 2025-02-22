import {DeviceEventEmitter, NativeModules} from 'react-native';
import {useEffectOnce} from 'react-use';
import {IBtcPriceValueItem} from '../../utils/utils';
import useBtcData from '../useBtcData/useBtcData';

/*
  This hook:
  - starts or pause android bitcoin retriever module
  - listens data from android bitcoin retriever module and saves it to redux
*/
const useAndroidBtcRetrieverModuleHandler = () => {
  const {BitconRetrieverModule} = NativeModules;

  const {setBtcPrices, setBtcPricesLoadingError} = useBtcData();

  useEffectOnce(() => {
    const priceListener = DeviceEventEmitter.addListener(
      'bitcoinPricesUpdated',
      (bitcoinPrices: IBtcPriceValueItem[]) => {
        console.log('bitcoinPricesUpdated called');
        setBtcPrices(bitcoinPrices);
        setBtcPricesLoadingError(undefined);
      },
    );

    const errorListener = DeviceEventEmitter.addListener(
      'bitcoinPriceError',
      errorMessage => {
        console.log('bitcoinPriceError called');
        setBtcPricesLoadingError(errorMessage);
      },
    );

    BitconRetrieverModule.startFetchingBitcoinPrice();

    return () => {
      priceListener.remove();
      errorListener.remove();
      BitconRetrieverModule.stopFetchingBitcoinPrice();
    };
  });
};

export default useAndroidBtcRetrieverModuleHandler;
