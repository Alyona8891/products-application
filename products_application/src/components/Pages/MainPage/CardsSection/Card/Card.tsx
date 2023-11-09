import styles from './Card.module.scss';
import { IProduct } from '../../../../../types/types';

export function Card(props: { product: IProduct }): React.ReactElement {
  const { product } = props;
  const description = product.description?.slice(0, 65).concat('...');

  return (
    <div className={styles.card}>
      <img className={styles.image} src={product.images[0]} alt="card image" />
      <h3 className={styles.title}>{product.title}</h3>
      <p className={styles.text}>{description}</p>
    </div>
  );
}
