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
import counterSlice from './counterSlice';
import dataSlice from './dataSlice_2'; // 새로 추가한 dataSlice

const rootReducer = combineReducers({
  counter: counterSlice,
  data: dataSlice // 추가한 dataSlice의 리듀서를 연결
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
  //sotrage: storage("ML_DB")
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      
      // }).concat(logger),
    }),
});


export const persistor = persistStore(store);
export default store;