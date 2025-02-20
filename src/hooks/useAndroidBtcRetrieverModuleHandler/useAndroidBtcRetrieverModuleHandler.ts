import {DeviceEventEmitter, NativeModules} from 'react-native';
import {useEffectOnce} from 'react-use';
import {useDispatch} from 'react-redux';
import {setBtcPrices} from '../../utils/store';
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
    console.log("Listneners set")

    const priceListener = DeviceEventEmitter.addListener(
      'bitcoinPricesUpdated',
      (bitcoinPrices: IBtcPriceValueItem[]) => {
        dispatch(setBtcPrices(bitcoinPrices))
      },
    );

    const errorListener = DeviceEventEmitter.addListener(
      'bitcoinPriceError',
      errorMessage => {
        console.log('errorMessage', errorMessage);
        // TODO, SAVE TO REDUX
      },
    );
    
    console.log("start fetching set")
    BitconRetrieverModule.startFetchingBitcoinPrice();

    return () => {
      priceListener.remove();
      errorListener.remove();
      BitconRetrieverModule.stopFetchingBitcoinPrice();
    };
  });
};

export default useAndroidBtcRetrieverModuleHandler;
