import { useSelector } from 'react-redux';
import { IAppStoreState } from '../../utils/store';

const useBtcData = () => {
  const btcPrices = useSelector((state: IAppStoreState) => state!.btcPrices)
  const btcPricesLoadingError = useSelector((state: IAppStoreState) => state!.btcPricesLoadingError)

  return {
    error: btcPricesLoadingError,
    btcPrices: btcPrices,
    currentBtcPrice: btcPrices?.[btcPrices.length - 1].priceInEur,
    weekAgoBtcPrice: btcPrices?.[btcPrices.length - 8]?.priceInEur
  }
}

export default useBtcData