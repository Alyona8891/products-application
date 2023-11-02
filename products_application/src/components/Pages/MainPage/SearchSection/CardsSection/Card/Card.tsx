import styles from './Card.module.scss';
import { IProduct } from '../../../../../../types';

export function Card(props: { product: IProduct }): React.ReactElement {
  const { product } = props;

  return (
    <div className={styles.card}>
      <img className={styles.image} src={product.images[0]} alt="card image" />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.text}>{product.description}</p>
    </div>
  );
}
