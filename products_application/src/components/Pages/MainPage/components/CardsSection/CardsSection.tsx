import { Link } from 'react-router-dom';
import { IProduct } from '../../../../../types/types';
import { Card } from '../Card/Card';
import styles from './CardsSection.module.scss';
import { useContext } from 'react';
import { ProductsContext } from '../../../../ProductsContext/ProductsContext';

export function CardsSection(props: {
  currentPage: number;
}): React.ReactElement {
  const { currentPage } = props;
  const context = useContext(ProductsContext);
  const { productsData } = context;
  const { products } = productsData;
  return (
    <section className={styles.cards_section}>
      {products.length > 0 ? (
        products.map((product: IProduct) => {
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
