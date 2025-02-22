import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import {ITradeItem, STARTING_EUR_VALUE} from './utils';

export interface ITradesStoreState {
  trades: ITradeItem[];
}

const initialEurTrade: ITradeItem = {
  btcVolume: 0,
  eurVolume: STARTING_EUR_VALUE,
  boughtBtc: false,
  timestamp: Date.now(),
  isInitalTransaction: true
};

const tradesStoreInitialState: ITradesStoreState = {
  trades: [{ ...initialEurTrade }]
};

export const tradesDataSlice = createSlice({
  name: 'tradesData',
  initialState: tradesStoreInitialState,
  reducers: {
    addTrade: (state, action: PayloadAction<ITradeItem>) => {
      state.trades = [...state.trades, { ...action.payload }]
    },
  },
});

export const {addTrade} = tradesDataSlice.actions;

const persistConfig = {
  key: 'tradesStore',
  storage: AsyncStorage,
  whitelist: ['trades', 'startingEurValue'],
};

export const tradesDataPersistedReducer = persistReducer(
  persistConfig,
  tradesDataSlice.reducer,
);
