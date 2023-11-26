import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IParams } from '../types/types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/products',
  }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (params: IParams) =>
        `search?q=${params.keyword}&limit=${params.productsOnPage}&skip=${
          (params.currentPage - 1) * params.productsOnPage
        }`,
    }),
    fetchProduct: builder.query({
      query: (id: number) => `${id}`,
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductQuery,
  util: { getRunningQueriesThunk },
} = api;
export const { fetchProducts, fetchProduct } = api.endpoints;
