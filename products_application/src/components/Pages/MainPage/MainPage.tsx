import { useEffect, useState } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './SearchSection/SearchSection';
import { CardsSection } from './CardsSection/CardsSection';
import { fetchProducts } from '../../../utils/fetchProducts';
import { IProduct } from '../../../types/types';
import { searchProducts } from '../../../utils/searchProducts';
import { getKeyWord } from '../../../utils/getKeyWord';
import { PagintionSection } from './PaginationSection/PaginationSection';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../../../constants/constants';

export function MainPage(): React.ReactElement {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [products, setProducts] = useState<{
    productsArr: IProduct[];
    totalCount: number;
  }>({ productsArr: [], totalCount: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityProductsOnPage, setProductsOnPage] = useState(10);

  useEffect(() => {
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(
          keyWord,
          setIsLoadingProducts,
          setIsLoadingPagination,
          DEFAULT_CURRENT_PAGE,
          DEFAULT_ITEMS_QUANTITY
        )
      : fetchProducts(
          setIsLoadingProducts,
          setIsLoadingPagination,
          DEFAULT_CURRENT_PAGE,
          DEFAULT_ITEMS_QUANTITY
        )
    ).then((data) => {
      if (data) {
        setIsLoadingPagination(false);
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  }, []);

  const handleSearchButton = (keyWord: string): void => {
    setIsLoadingProducts(true);
    searchProducts(
      keyWord,
      setIsLoadingProducts,
      setIsLoadingPagination,
      1,
      quantityProductsOnPage
    ).then((data) => {
      if (data) {
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  const handleItemsQuantityInput = (quantity: number): void => {
    setIsLoadingProducts(true);
    setProductsOnPage(quantity);
    setCurrentPage(DEFAULT_CURRENT_PAGE);
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(
          keyWord,
          setIsLoadingProducts,
          setIsLoadingPagination,
          DEFAULT_CURRENT_PAGE,
          quantity
        )
      : fetchProducts(
          setIsLoadingProducts,
          setIsLoadingPagination,
          DEFAULT_CURRENT_PAGE,
          quantity
        )
    ).then((data) => {
      if (data) {
        setIsLoadingPagination(false);
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  const handlePaginationButton = (currentPage: number): void => {
    setIsLoadingProducts(true);
    setCurrentPage(currentPage);
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(
          keyWord,
          setIsLoadingProducts,
          setIsLoadingPagination,
          currentPage,
          quantityProductsOnPage
        )
      : fetchProducts(
          setIsLoadingProducts,
          setIsLoadingPagination,
          currentPage,
          quantityProductsOnPage
        )
    ).then((data) => {
      if (data) {
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <SearchSection onSubmit={handleSearchButton} />
        {!isLoadingPagination && (
          <PagintionSection
            currentPage={currentPage}
            productCount={products.totalCount}
            productsOnPage={quantityProductsOnPage}
            onClick={handlePaginationButton}
            onInput={handleItemsQuantityInput}
          />
        )}
        {isLoadingProducts ? (
          <Loader />
        ) : (
          <CardsSection products={products.productsArr} />
        )}
      </main>
      <footer className={styles.footer} />
    </>
  );
}
