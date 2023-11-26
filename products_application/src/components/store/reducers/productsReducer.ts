import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
});

export const { setSearchValue, setProductsOnPage } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
