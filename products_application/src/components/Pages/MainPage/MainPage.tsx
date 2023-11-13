import { useContext, useEffect } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/SearchSection/SearchSection';
import { CardsSection } from './components/CardsSection/CardsSection';

import { getKeyWord } from '../../../utils/getKeyWord';
import { PagintionSection } from './components/PaginationSection/PaginationSection';
import { DEFAULT_CURRENT_PAGE } from '../../../constants/constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext/AppContext';

export function MainPage(): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(queryParameters.get('details')) || null;

  const context = useContext(AppContext);
  const {
    isLoadingProducts,
    isLoadingPagination,
    getProductsData,
    quantityProductsOnPage,
  } = context;

  useEffect(() => {
    const keyWord = getKeyWord();
    getProductsData(keyWord, currentPage, quantityProductsOnPage);
  }, [currentPage, getProductsData, quantityProductsOnPage]);

  const handleQueryChange = (param: string, value: number) => {
    queryParameters.set(`${param}`, value.toString());
    navigate({ search: queryParameters.toString() });
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
          <SearchSection handleQueryChange={handleQueryChange} />
          {!isLoadingPagination && (
            <PagintionSection
              currentPage={currentPage}
              handleQueryChange={handleQueryChange}
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
