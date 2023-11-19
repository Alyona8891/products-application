import { IProduct } from '../../../types/types';

export interface IParams {
  currentPage: number;
  productsOnPage: number;
}

export interface IProductsSliceState {
  products: IProduct[];
  totalQuantity: number;
  productsOnPage: number;
  searchValue: string;
  productsLoadingStatus: string;
  productLoadingStatus: string;
}
