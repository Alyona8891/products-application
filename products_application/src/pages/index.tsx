import { Loader } from '../components/Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from '../components/Pages/MainPage/components/SearchSection/SearchSection';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';
import { PagintionSection } from '../components/Pages/MainPage/components/PaginationSection/PaginationSection';
import { DEFAULT_CURRENT_PAGE } from '../constants/constants';
import { Outlet } from 'react-router-dom';
import { RootState } from '../components/store/store';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery } from '../components/store/utils/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function MainPage(): React.ReactElement {
  const location = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParameters = new URLSearchParams(location);
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(queryParameters.get('details')) || null;

  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const { data, isFetching, error } = useFetchProductsQuery({
    currentPage,
    productsOnPage,
  });

  const handleQueryChange = (param: string, value: number) => {
    queryParameters.set(`${param}`, value.toString());
    router.push(pathname + '?' + queryParameters);
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
