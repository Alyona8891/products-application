import styles from './MainPage.module.scss';
import { SearchSection } from '../components/Pages/MainPage/components/SearchSection/SearchSection';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';
import { PagintionSection } from '../components/Pages/MainPage/components/PaginationSection/PaginationSection';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../constants/constants';
import { wrapper } from '../components/store/store';
import {
  fetchProduct,
  fetchProducts,
  getRunningQueriesThunk,
} from '../components/store/utils/api';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IProduct, IResponse } from '../types/types';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const currentPage = Number(context.query.page) || DEFAULT_CURRENT_PAGE;
    const currentCard = context.query.details?.toString() || '';
    const productsOnPage =
      Number(context.query.limit) || DEFAULT_ITEMS_QUANTITY;
    const keyword = context.query.search?.toString() || '';
    const response = await store.dispatch(
      fetchProducts.initiate({
        keyword,
        currentPage,
        productsOnPage,
      })
    );
    const details = await store.dispatch(fetchProduct.initiate(currentCard));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        response,
        currentCard,
        currentPage,
        productsOnPage,
        keyword,
        details,
      },
    };
  }
);

interface IServerSideProps {
  response: IResponse;
  currentCard: number;
  currentPage: number;
  productsOnPage: number;
  keyword: string;
  details: IProduct;
}

export default function MainPage({
  response,
  currentCard,
  currentPage,
  productsOnPage,
  keyword, //details,
}: IServerSideProps): React.ReactElement {
  const { data, error } = response;
  const totalQuantity = data.total;

  const location = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const queryParameters = new URLSearchParams(location);

  const handleQueryChange = (
    search: string,
    page: number,
    productsOnPage: number
  ) => {
    queryParameters.set('page', page.toString());
    queryParameters.set('search', search.toString());
    queryParameters.set('limit', productsOnPage.toString());
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
            totalQuantity={totalQuantity}
            productsOnPage={productsOnPage}
          />
          <CardsSection currentPage={currentPage} data={data} />
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
