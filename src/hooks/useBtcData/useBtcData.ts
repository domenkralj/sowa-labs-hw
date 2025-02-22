import { useSelector } from 'react-redux';
import { IBtcDataStoreState } from '../../utils/btcDataStore';

const useBtcData = () => {
  const btcPrices = useSelector((state: { btcDataStore: IBtcDataStoreState }) => state.btcDataStore.btcPrices)
  const btcPricesLoadingError = useSelector((state: { btcDataStore: IBtcDataStoreState }) => state.btcDataStore.btcPricesLoadingError)
  
  return {
    error: btcPricesLoadingError,
    btcPrices: btcPrices,
    currentBtcPrice: btcPrices?.[btcPrices.length - 1].priceInEur,
    weekAgoBtcPrice: btcPrices?.[btcPrices.length - 8]?.priceInEur
  }
}

export default useBtcData