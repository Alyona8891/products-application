import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './reducers/productsReducer';
import { useDispatch } from 'react-redux';
import { api } from './utils/api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    products: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
