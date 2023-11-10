import { useContext, useEffect, useState } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/SearchSection/SearchSection';
import { CardsSection } from './components/CardsSection/CardsSection';

import { getKeyWord } from '../../../utils/getKeyWord';
import { PagintionSection } from './components/PaginationSection/PaginationSection';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../../../constants/constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ProductsContext } from '../../ProductsContext/ProductsContext';

export function MainPage(): React.ReactElement {
  const [quantityProductsOnPage, setProductsOnPage] = useState(
    DEFAULT_ITEMS_QUANTITY
  );
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(queryParameters.get('details')) || null;

  const context = useContext(ProductsContext);
  const {
    isLoadingProducts,
    isLoadingPagination,
    getProductsData,
    setIsLoadingProducts,
  } = context;

  useEffect(() => {
    const keyWord = getKeyWord();
    getProductsData(keyWord, currentPage, quantityProductsOnPage);
  }, [currentPage, getProductsData, quantityProductsOnPage]);

  const handleSearchButton = (keyWord: string): void => {
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    getProductsData(keyWord, DEFAULT_CURRENT_PAGE, quantityProductsOnPage);
  };

  const handleItemsQuantityInput = (quantity: number): void => {
    setIsLoadingProducts(true);
    setProductsOnPage(quantity);
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    const keyWord = getKeyWord();
    getProductsData(keyWord, DEFAULT_CURRENT_PAGE, quantity);
  };

  const handleQueryChange = (param: string, value: number) => {
    queryParameters.set(`${param}`, value.toString());
    navigate({ search: queryParameters.toString() });
  };

  const handlePaginationButton = (currentPage: number): void => {
    setIsLoadingProducts(true);
    handleQueryChange('page', currentPage);
    const keyWord = getKeyWord();
    getProductsData(keyWord, currentPage, quantityProductsOnPage);
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
              productsOnPage={quantityProductsOnPage}
              onClick={handlePaginationButton}
              onInput={handleItemsQuantityInput}
            />
          )}
          {isLoadingProducts ? (
            <Loader />
          ) : (
            <CardsSection currentPage={currentPage} />
          )}
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
