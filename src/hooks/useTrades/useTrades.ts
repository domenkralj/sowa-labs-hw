import {useDispatch, useSelector} from 'react-redux';
import {ITradesStoreState, addTrade} from '../../utils/tradesStore';
import {ITradeItem} from '../../utils/utils';

const useTrades = () => {
  const dispatch = useDispatch();

  const trades = useSelector(
    (state: {tradesStore: ITradesStoreState}) => state.tradesStore.trades,
  );

  const currentEur = trades.reduce(
    (value, trade) => trade.boughtBtc ? value - trade.eurVolume : value + trade.eurVolume, 
    0
  )

  const currentBtc = trades.reduce(
    (value, trade) => trade.boughtBtc ? value + trade.btcVolume : value - trade.btcVolume, 
    0
  )

  const makeTrade = (newTrade: ITradeItem) => dispatch(addTrade(newTrade));

  return {
    previousTrades: trades,
    currentEur,
    currentBtc,
    makeTrade
  };
};

export default useTrades;
