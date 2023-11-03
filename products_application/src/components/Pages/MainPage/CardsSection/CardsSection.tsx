import { IProduct } from '../../../../types/types';
import { Pagination } from '../../../Pagination/Pagination';
import { Card } from './Card/Card';
import styles from './CardsSection.module.scss';

export function CardsSection(props: {
  products: IProduct[];
}): React.ReactElement {
  const { products } = props;
  return (
    <section className={styles.cards_section}>
      <Pagination />
      {products.length > 0 ? (
        products.map((product: IProduct) => {
          return <Card product={product} key={product.id} />;
        })
      ) : (
        <p className={styles.message}>
          Sorry, nothing found. Please, try again!
        </p>
      )}
    </section>
  );
}
