export interface IRequestResult {
  total: number;
  products: IProduct[] | [];
}

export interface IProduct {
  id: number;
  title: string;
  text: string;
  images: string[];
  description: string;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}

export type AppContextProps = {
  productsData: IRequestResult;
  isLoadingProducts: boolean;
  isLoadingPagination: boolean;
  getProductsData: (
    keyWord: string,
    currentPage: number,
    quantityProductsOnPage: number
  ) => void;
  setIsLoadingProducts: React.Dispatch<React.SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  quantityProductsOnPage: number;
  setProductsOnPage: React.Dispatch<React.SetStateAction<number>>;
};
