import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../utils/api';
import { initialState } from '../data/data';

export const productsSlice = createSlice({
  name: 'productsData',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setProductsOnPage: (state, action: PayloadAction<number>) => {
      state.productsOnPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsDataLoadingStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalQuantity = action.payload.total;
        state.productsDataLoadingStatus = 'loaded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsDataLoadingStatus = 'error';
      });
  },
});

export const { setSearchValue, setProductsOnPage } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
