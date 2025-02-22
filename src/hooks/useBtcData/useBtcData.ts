import { useDispatch, useSelector } from 'react-redux';
import { IBtcDataStoreState } from '../../utils/btcDataStore';
import { IBtcPriceValueItem } from '../../utils/utils';
import {setBtcPrices as setBtcPricesStore, setBtcPricesLoadingError as setBtcPricesLoadingErrorStore} from '../../utils/btcDataStore';

const useBtcData = () => {
  const dispatch = useDispatch();
  const btcPrices = useSelector((state: { btcDataStore: IBtcDataStoreState }) => state.btcDataStore.btcPrices)
  const btcPricesLoadingError = useSelector((state: { btcDataStore: IBtcDataStoreState }) => state.btcDataStore.btcPricesLoadingError)

  const setBtcPrices = (bitcoinPrices: IBtcPriceValueItem[]) => {
    dispatch(setBtcPricesStore(bitcoinPrices))
  }

  const setBtcPricesLoadingError = (error: string | undefined) => {
    dispatch(setBtcPricesLoadingErrorStore(error))
  }

  return {
    error: btcPricesLoadingError,
    setBtcPricesLoadingError,
    btcPrices: btcPrices,
    setBtcPrices,
    currentBtcPrice: btcPrices?.[btcPrices.length - 1].priceInEur,
    weekAgoBtcPrice: btcPrices?.[btcPrices.length - 8]?.priceInEur
  }
}

export default useBtcData