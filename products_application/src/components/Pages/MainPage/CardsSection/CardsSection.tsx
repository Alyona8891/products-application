import { IProduct } from '../../../../types/types';
import { Card } from './Card/Card';
import styles from './CardsSection.module.scss';

export function CardsSection(props: {
  products: IProduct[];
  onClick: (id: number) => void;
}): React.ReactElement {
  const { products, onClick } = props;
  return (
    <section className={styles.cards_section}>
      {products.length > 0 ? (
        products.map((product: IProduct) => {
          return <Card product={product} key={product.id} onClick={onClick} />;
        })
      ) : (
        <p className={styles.message}>
          Sorry, nothing found. Please, try again!
        </p>
      )}
    </section>
  );
}
