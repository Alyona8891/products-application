import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IRequestResult } from '../../types/types';
import { getProducts } from '../../utils/api';

type ProductsContextProps = {
  productsData: IRequestResult;
  isLoadingProducts: boolean;
  isLoadingPagination: boolean;
  getProductsData: (
    keyWord: string,
    currentPage: number,
    quantityProductsOnPage: number
  ) => void;
  setIsLoadingProducts: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [productsData, setProductsData] = useState<IRequestResult>({
    products: [],
    total: 0,
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);

  const getProductsData = useCallback(
    (keyWord: string, currentPage: number, quantityProductsOnPage: number) => {
      getProducts(keyWord, currentPage, quantityProductsOnPage).then((data) => {
        if (data) {
          setProductsData({
            products: data.products,
            total: data.total,
          });
        }
        setIsLoadingPagination(false);
        setIsLoadingProducts(false);
      });
    },
    []
  );

  useEffect(() => {
    getProductsData('', 1, 10);
  }, [getProductsData]);

  return (
    <ProductsContext.Provider
      value={{
        productsData,
        isLoadingProducts,
        isLoadingPagination,
        getProductsData,
        setIsLoadingProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }
  return context;
}
