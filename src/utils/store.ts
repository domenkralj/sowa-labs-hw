import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {btcDataSlice} from './btcDataStore';
import {tradesDataPersistedReducer} from './tradesStore';
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const rootReducer = combineReducers({
  btcDataStore: btcDataSlice.reducer,
  tradesStore: tradesDataPersistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export {store, persistor};
