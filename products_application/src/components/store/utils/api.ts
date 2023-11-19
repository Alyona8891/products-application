import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IParams } from '../types/types';
import { getKeyWord } from '../../../utils/getKeyWord';
import {
  setProductLoadingStatus,
  setProductsLoadingStatus,
} from '../reducers/productsReducer';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/products',
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (params: IParams) =>
        `search?q=${getKeyWord()}&limit=${params.productsOnPage}&skip=${
          (params.currentPage - 1) * params.productsOnPage
        }`,
      async onQueryStarted(id, { dispatch }) {
        try {
          dispatch(setProductsLoadingStatus('loaded'));
        } catch (err) {
          dispatch(setProductsLoadingStatus('error'));
        }
      },
    }),
    fetchProduct: builder.query({
      query: (id: number) => `${id}`,
      async onQueryStarted(id, { dispatch }) {
        try {
          dispatch(setProductLoadingStatus('loaded'));
        } catch (err) {
          dispatch(setProductLoadingStatus('error'));
        }
      },
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductQuery } = api;
