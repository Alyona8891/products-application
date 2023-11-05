import styles from './Card.module.scss';
import { IProduct } from '../../../../../types/types';

export function Card(props: {
  product: IProduct;
  onClick: (id: number) => void;
}): React.ReactElement {
  const { product, onClick } = props;

  return (
    <div
      className={styles.card}
      onClick={() => {
        onClick(product.id);
      }}
    >
      <img className={styles.image} src={product.images[0]} alt="card image" />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.text}>{product.description}</p>
    </div>
  );
}
