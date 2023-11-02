import { Card } from './Card/Card';
import { IProduct } from '../../../../../types';
import styles from './CardsSection.module.scss';

export function CardsSection(props: {
  products: IProduct[];
}): React.ReactElement {
  const { products } = props;
  return (
    <section className={styles.cards_section}>
      {products.map((product: IProduct) => {
        return <Card product={product} key={product.id} />;
      })}
    </section>
  );
}
