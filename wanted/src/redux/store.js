import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage/session";

// slice import
import dataSlice from './dataSlice'; // 새로 추가한 dataSlice


const rootReducer = combineReducers({
  data: dataSlice // 추가한 dataSlice의 리듀서를 연결
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    }),
});


export const persistor = persistStore(store);
export default store;