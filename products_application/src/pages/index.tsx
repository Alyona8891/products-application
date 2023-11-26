import styles from './MainPage.module.scss';
import { SearchSection } from '../components/Pages/MainPage/components/SearchSection/SearchSection';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';
import { PagintionSection } from '../components/Pages/MainPage/components/PaginationSection/PaginationSection';
import { DEFAULT_CURRENT_PAGE } from '../constants/constants';
import { wrapper } from '../components/store/store';
import {
  fetchProducts,
  getRunningQueriesThunk,
} from '../components/store/utils/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IResponse } from '../types/types';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currentPage = Number(context.query.page) || DEFAULT_CURRENT_PAGE;
    const currentCard = context.query.details?.toString() || null;
    const productsOnPage = Number(context.query.limit) || DEFAULT_CURRENT_PAGE;
    const keyword = context.query.search?.toString() || '';
    const response = await store.dispatch(
      fetchProducts.initiate({
        keyword,
        currentPage,
        productsOnPage,
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { response, currentCard, currentPage, productsOnPage, keyword },
    };
  }
);

interface IServerSideProps {
  response: IResponse;
  currentCard: number;
  currentPage: number;
  keyword: string;
}

export default function MainPage({
  response,
  currentCard,
  currentPage,
  keyword,
}: IServerSideProps): React.ReactElement {
  const { data, error } = response;

  const location = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParameters = new URLSearchParams(location);

  const handleQueryChange = (search: string, page: number) => {
    queryParameters.set('page', page.toString());
    queryParameters.set('search', search.toString());
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
          <SearchSection
            handleQueryChange={handleQueryChange}
            keyword={keyword}
          />
          <PagintionSection
            currentPage={currentPage}
            handleQueryChange={handleQueryChange}
          />
          <CardsSection currentPage={currentPage} data={data} />
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
