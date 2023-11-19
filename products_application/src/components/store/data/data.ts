import { DEFAULT_ITEMS_QUANTITY } from '../../../constants/constants';
import { IProductsSliceState } from '../types/types';

export const initialState: IProductsSliceState = {
  products: [],
  totalQuantity: 0,
  productsOnPage: DEFAULT_ITEMS_QUANTITY,
  searchValue: '',
  productsLoadingStatus: 'loading',
  productLoadingStatus: 'loading',
};
