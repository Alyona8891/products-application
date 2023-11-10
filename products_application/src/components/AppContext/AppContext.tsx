import { createContext, useCallback, useState } from 'react';
import { AppContextProps, IRequestResult } from '../../types/types';
import { getProducts } from '../../utils/api';
import { DEFAULT_ITEMS_QUANTITY } from '../../constants/constants';

export const AppContext = createContext({} as AppContextProps);

export function ProductsProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [productsData, setProductsData] = useState<IRequestResult>({
    products: [],
    total: 0,
  });
  const [quantityProductsOnPage, setProductsOnPage] = useState(
    DEFAULT_ITEMS_QUANTITY
  );
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <AppContext.Provider
      value={{
        productsData,
        isLoadingProducts,
        isLoadingPagination,
        getProductsData,
        setIsLoadingProducts,
        inputValue,
        setInputValue,
        setProductsOnPage,
        quantityProductsOnPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
