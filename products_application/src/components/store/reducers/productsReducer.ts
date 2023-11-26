import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from '../data/data';

export const productsSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    /*setTotalQuantity: (state, action: PayloadAction<number>) => {
      state.totalQuantity = action.payload;
    },*/
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setProductsOnPage: (state, action: PayloadAction<number>) => {
      state.productsOnPage = action.payload;
    },
    /*setProductsLoadingStatus: (state, action: PayloadAction<string>) => {
      state.productsLoadingStatus = action.payload;
    },
    setProductLoadingStatus: (state, action: PayloadAction<string>) => {
      state.productLoadingStatus = action.payload;
    },*/
  },
});

export const {
  /*setProducts,
  setTotalQuantity,*/
  setSearchValue,
  setProductsOnPage,
  /*setProductsLoadingStatus,
  setProductLoadingStatus,*/
} = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
