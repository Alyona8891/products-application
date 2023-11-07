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
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export function MainPage(): React.ReactElement {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [products, setProducts] = useState<{
    productsArr: IProduct[];
    totalCount: number;
  }>({ productsArr: [], totalCount: 0 });
  const [quantityProductsOnPage, setProductsOnPage] = useState(
    DEFAULT_ITEMS_QUANTITY
  );
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(queryParameters.get('details')) || null;

  useEffect(() => {
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
        setIsLoadingPagination(false);
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  }, [currentCard, currentPage, quantityProductsOnPage]);

  const handleSearchButton = (keyWord: string): void => {
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    searchProducts(
      keyWord,
      setIsLoadingProducts,
      setIsLoadingPagination,
      DEFAULT_CURRENT_PAGE,
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
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
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

  const handleQueryChange = (param: string, value: number) => {
    queryParameters.set(`${param}`, value.toString());
    navigate({ search: queryParameters.toString() });
  };

  const handlePaginationButton = (currentPage: number): void => {
    setIsLoadingProducts(true);
    handleQueryChange('page', currentPage);
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
        <div
          className={
            currentCard
              ? `${styles.container} ${styles.container_animationed}`
              : `${styles.container}`
          }
        >
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
            <CardsSection
              products={products.productsArr}
              currentPage={currentPage}
            />
          )}
          {currentCard && <Outlet />}
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
