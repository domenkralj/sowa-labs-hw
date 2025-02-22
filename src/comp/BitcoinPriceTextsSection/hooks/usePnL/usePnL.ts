import { STARTING_EUR_VALUE } from "../../../../utils/utils";
import useBtcData from "../../../../hooks/useBtcData/useBtcData";
import useTrades from "../../../../hooks/useTrades/useTrades";

const usePnL = () => {
  const { currentBtcPrice } = useBtcData()
  const { currentBtc, currentEur } = useTrades()

  const fullAssetValueInEur = currentEur + currentBtc * currentBtcPrice!

  const pnl = fullAssetValueInEur - STARTING_EUR_VALUE

  return pnl
};

export default usePnL;
