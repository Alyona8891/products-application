import { Link } from 'react-router-dom';
import { IProduct, IRequestResult } from '../../../../../types/types';
import { Card } from '../Card/Card';
import styles from './CardsSection.module.scss';
import { AppDispatch, useAppDispatch } from '../../../../store/store';
import { useEffect } from 'react';
import {
  setProducts,
  setTotalQuantity,
} from '../../../../store/reducers/productsReducer';

export function CardsSection(props: {
  currentPage: number;
  data: IRequestResult;
}): React.ReactElement {
  const { currentPage, data } = props;
  const dispatch: AppDispatch = useAppDispatch();

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
