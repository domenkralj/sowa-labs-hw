import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import { IBtcPriceValueItem } from './global';

export interface IAppStoreState {
  btcPrices: IBtcPriceValueItem[] | undefined; // [timestamp, price]
  trades: boolean
}

const initialState: IAppStoreState = {
  btcPrices: undefined,
  trades: false
}

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    setBtcPrices: (state, action: PayloadAction<IBtcPriceValueItem[]>) => {
      state.btcPrices = action.payload;
    }
  }
});

export const {setBtcPrices} = globalSlice.actions;

export const globalAppReduxStore = configureStore({
  reducer: globalSlice.reducer,
});
