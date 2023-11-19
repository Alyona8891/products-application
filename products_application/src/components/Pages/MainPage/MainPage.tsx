import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/SearchSection/SearchSection';
import { CardsSection } from './components/CardsSection/CardsSection';
import { PagintionSection } from './components/PaginationSection/PaginationSection';
import { DEFAULT_CURRENT_PAGE } from '../../../constants/constants';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery } from '../../store/utils/api';

export function MainPage(): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(queryParameters.get('details')) || null;

  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const { isFetching, error } = useFetchProductsQuery({
    currentPage,
    productsOnPage,
  });

  const handleQueryChange = (param: string, value: number) => {
    queryParameters.set(`${param}`, value.toString());
    navigate({ search: queryParameters.toString() });
  };

  if (error) {
    return (
      <h3 className={styles.message}>
        Something went wrong. Please, try later!
      </h3>
    );
  }

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
          {!isFetching && (
            <PagintionSection
              currentPage={currentPage}
              handleQueryChange={handleQueryChange}
            />
          )}
          {isFetching ? <Loader /> : <CardsSection currentPage={currentPage} />}
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
