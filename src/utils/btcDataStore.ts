import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IBtcPriceValueItem} from './utils';

export interface IBtcDataStoreState {
  btcPrices: IBtcPriceValueItem[] | undefined;
  btcPricesLoadingError: string | undefined;
}

const btcDataStoreInitialState: IBtcDataStoreState = {
  btcPrices: undefined,
  btcPricesLoadingError: undefined,
};

export const btcDataSlice = createSlice({
  name: 'btcDataSlice',
  initialState: btcDataStoreInitialState,
  reducers: {
    setBtcPrices: (state, action: PayloadAction<IBtcPriceValueItem[]>) => {
      state.btcPrices = action.payload;
    },
    setBtcPricesLoadingError: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.btcPricesLoadingError = action.payload;
    },
  },
});

export const {setBtcPrices, setBtcPricesLoadingError} = btcDataSlice.actions;