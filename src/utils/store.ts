import {createSlice, configureStore, PayloadAction} from '@reduxjs/toolkit';
import { IBtcPriceValueItem } from './global';

export interface IAppStoreState {
  btcPrices: IBtcPriceValueItem[] | undefined;
  btcPricesLoadingError: string | undefined

}

const initialState: IAppStoreState = {
  btcPrices: undefined,
  btcPricesLoadingError: undefined
}

const globalSlice = createSlice({
  name: 'globalSlice',
  initialState: initialState,
  reducers: {
    setBtcPrices: (state, action: PayloadAction<IBtcPriceValueItem[]>) => {
      state.btcPrices = action.payload;
    },
    setBtcPricesLoadingError: (state, action: PayloadAction<string | undefined>) => {
      state.btcPricesLoadingError = action.payload
    }
  }
});

export const {setBtcPrices, setBtcPricesLoadingError} = globalSlice.actions;

export const globalAppReduxStore = configureStore({
  reducer: globalSlice.reducer
});
