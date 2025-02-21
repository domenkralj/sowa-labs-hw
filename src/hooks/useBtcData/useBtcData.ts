import { useSelector } from 'react-redux';
import { IAppStoreState } from '../../utils/store';

const useBtcData = () => {
  const btcPrices = useSelector((state: IAppStoreState) => state!.btcPrices)

  const btcPricesTEST = [...btcPrices || [], { priceInEur: 94999, timestamp: 1740154080000 }]

  return {
    error: undefined,
    btcPrices: btcPricesTEST,
    currentBtcPrice: btcPricesTEST?.[btcPricesTEST.length - 1].priceInEur,
    weekAgoBtcPrice: btcPricesTEST?.[btcPricesTEST.length - 8]?.priceInEur
  }
}

export default useBtcData