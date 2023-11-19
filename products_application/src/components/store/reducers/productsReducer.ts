import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../data/data';

export const productsSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setTotalQuantity: (state, action: PayloadAction<number>) => {
      state.totalQuantity = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setProductsOnPage: (state, action: PayloadAction<number>) => {
      state.productsOnPage = action.payload;
    },
  },
});

export const {
  setProducts,
  setTotalQuantity,
  setSearchValue,
  setProductsOnPage,
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
