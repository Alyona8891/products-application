import { createAsyncThunk } from '@reduxjs/toolkit';
import { IParams } from '../types/types';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: IParams, thunkAPI) => {
    const { keyword, currentPage, productsOnPage } = params;
    const skipCount = (currentPage - 1) * productsOnPage;
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${keyword}&limit=${productsOnPage}&skip=${skipCount}`
      );
      const json = await res.json();
      return json;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch products');
    }
  }
);
