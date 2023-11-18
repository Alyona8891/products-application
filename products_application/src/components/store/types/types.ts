import { IProduct } from '../../../types/types';

export interface IParams {
  keyword: string;
  currentPage: number;
  productsOnPage: number;
}

export interface IProductsSliceState {
  products: IProduct[];
  totalQuantity: number;
  productsDataLoadingStatus: string;
  productsOnPage: number;
  searchValue: string;
}
