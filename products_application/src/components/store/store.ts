import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { api } from './utils/api';
import { createWrapper } from 'next-redux-wrapper';
import { productsReducer } from './reducers/productsReducer';

const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
