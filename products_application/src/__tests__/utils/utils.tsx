import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState } from '../../components/store/store';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { api } from '../../components/store/utils/api';
import { productsReducer } from '../../components/store/reducers/productsReducer';
import { JSX } from 'react/jsx-runtime';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: ToolkitStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: {
        [api.reducerPath]: api.reducer,
        products: productsReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
