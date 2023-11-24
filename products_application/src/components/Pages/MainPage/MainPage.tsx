import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './components/SearchSection/SearchSection';
import { CardsSection } from './components/CardsSection/CardsSection';
import { PagintionSection } from './components/PaginationSection/PaginationSection';
import { DEFAULT_CURRENT_PAGE } from '../../../constants/constants';
import { Outlet } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery } from '../../store/utils/api';
import { useSearchParams } from 'next/navigation';

export function MainPage(): React.ReactElement {
  const location = useSearchParams();
  const currentPage = Number(location.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(location.get('details')) || null;

  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const { data, isFetching, error } = useFetchProductsQuery({
    currentPage,
    productsOnPage,
  });

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
          <SearchSection />
          {!isFetching && <PagintionSection currentPage={currentPage} />}
          {isFetching ? (
            <Loader />
          ) : (
            <CardsSection currentPage={currentPage} data={data} />
          )}
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
