import { Link } from 'react-router-dom';
import { IProduct } from '../../../../../types/types';
import { Card } from '../Card/Card';
import styles from './CardsSection.module.scss';
import { useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from '../../../../store/store';
import { useFetchProductsQuery } from '../../../../store/utils/api';
import { useEffect } from 'react';
import {
  setProducts,
  setTotalQuantity,
} from '../../../../store/reducers/productsReducer';

export function CardsSection(props: {
  currentPage: number;
}): React.ReactElement {
  const { currentPage } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );
  const { data } = useFetchProductsQuery({
    currentPage,
    productsOnPage,
  });

  useEffect(() => {
    dispatch(setProducts(data.products));
    dispatch(setTotalQuantity(data.total));
  }, [data.products, data.total, dispatch]);

  return (
    <section className={styles.cards_section}>
      {data.products.length > 0 ? (
        data.products.map((product: IProduct) => {
          return (
            <Link
              to={`details/?page=${currentPage}&details=${product.id}`}
              key={product.id}
            >
              <Card product={product} />;
            </Link>
          );
        })
      ) : (
        <p className={styles.message}>
          Sorry, nothing found. Please, try again!
        </p>
      )}
    </section>
  );
}
