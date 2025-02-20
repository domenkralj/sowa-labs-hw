import { useSelector } from 'react-redux';
import { IAppStoreState } from '../../utils/store';

const useBtcData = () => {
  const btcPrice = useSelector((state: IAppStoreState) => state!.btcPrices)

  console.log("btcPrice", btcPrice)

  return {
    error: undefined,
    data: btcPrice,
    currentBtcPrice: btcPrice?.[0].priceInEur
  }
}

export default useBtcData