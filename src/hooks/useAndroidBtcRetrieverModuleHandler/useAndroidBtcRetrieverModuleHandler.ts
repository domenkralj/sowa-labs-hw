import {DeviceEventEmitter, NativeModules} from 'react-native';
import {useEffectOnce} from 'react-use';
import {useDispatch} from 'react-redux';
import {setBtcPrices, setBtcPricesLoadingError} from '../../utils/store';
import { IBtcPriceValueItem } from '../../utils/global';

/*
  This hook:
  - starts or pause android bitcoin retriever module
  - listens data from android bitcoin retriever module and saves it to redux
*/
const useAndroidBtcRetrieverModuleHandler = () => {
  const {BitconRetrieverModule} = NativeModules;

  const dispatch = useDispatch();

  useEffectOnce(() => {

    const priceListener = DeviceEventEmitter.addListener(
      'bitcoinPricesUpdated',
      (bitcoinPrices: IBtcPriceValueItem[]) => {
        console.log("bitcoinPricesUpdated called")
        dispatch(setBtcPrices(bitcoinPrices))
        dispatch(setBtcPricesLoadingError(undefined))
      },
    );

    const errorListener = DeviceEventEmitter.addListener(
      'bitcoinPriceError',
      errorMessage => {
        console.log("bitcoinPriceError called")
        dispatch(setBtcPricesLoadingError(errorMessage))
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
