import {useDispatch, useSelector} from 'react-redux';
import {ITradeItem} from '../../utils/utils';
import {act, renderHook} from '@testing-library/react-native';
import {addTrade} from '../../utils/tradesStore';
import useTrades from './useTrades';

jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
  };
});

jest.mock('../../utils/tradesStore', () => {
  return {
    addTrade: jest.fn()
  };
});

describe('useTrades Hook', () => {
  it('should return initial state correctly', () => {
    const mockTrades: ITradeItem[] = [];
    (useSelector as unknown as jest.Mock).mockReturnValue(mockTrades);
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    const {result} = renderHook(() => useTrades());

    expect(result.current.previousTrades).toEqual([]);
    expect(result.current.currentEur).toBe(0);
    expect(result.current.currentBtc).toBe(0);
  });

  it('should calculate currentEur and currentBtc correctly', () => {
    const mockTrades: ITradeItem[] = [
      {boughtBtc: true, eurVolume: 1000, btcVolume: 0.05} as ITradeItem,
      {boughtBtc: false, eurVolume: 500, btcVolume: 0.025} as ITradeItem,
      {boughtBtc: true, eurVolume: 2000, btcVolume: 0.1} as ITradeItem,
    ];
    (useSelector as unknown as jest.Mock).mockReturnValue(mockTrades);
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    const {result} = renderHook(() => useTrades());

    expect(result.current.currentEur).toBe(-2500); // -1000 + 500 - 2000
    expect(result.current.currentBtc).toBe(0.125); // 0.05 - 0.025 + 0.1
  });

  it('should dispatch addTrade action correctly', () => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    const mockTrades: ITradeItem[] = [];
    (useSelector as unknown as jest.Mock).mockReturnValue(mockTrades);

    const newTrade: ITradeItem = {
      boughtBtc: true,
      eurVolume: 1500,
      btcVolume: 0.075,
    } as ITradeItem;

    const {result} = renderHook(() => useTrades());

    act(() => {
      result.current.makeTrade(newTrade);
    });

    expect(mockDispatch).toHaveBeenCalledWith(addTrade(newTrade));
  });

  it('should handle empty trades array', () => {
    const mockTrades: ITradeItem[] = [];
    (useSelector as unknown as jest.Mock).mockReturnValue(mockTrades);
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    const {result} = renderHook(() => useTrades());

    expect(result.current.currentEur).toBe(0);
    expect(result.current.currentBtc).toBe(0);
  });
});
