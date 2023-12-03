import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { usersReducer } from './reducers/usersReducer';
import { errorsReducer } from './reducers/errorsReducer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    errors: errorsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
