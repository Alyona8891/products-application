import styles from './Details.module.scss';
import { IProduct } from '../../types/types';
import { Outlet } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export function Details(props: {
  product: IProduct | null;
  isLoadingProduct: boolean;
  onClick: () => void;
}): React.ReactElement {
  const { product, isLoadingProduct, onClick } = props;

  return (
    <section className={styles.details}>
      <div className={styles.shadow} onClick={onClick} />
      {isLoadingProduct ? (
        <div className={styles.container}>
          <Loader />
        </div>
      ) : product?.title ? (
        <div className={styles.container}>
          <button className={styles.close_button} onClick={onClick}>
            +
          </button>
          <img
            className={styles.image}
            src={product.images[0]}
            alt="card image"
          />
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.text}>{product.description}</p>
        </div>
      ) : (
        <div className={styles.container}>
          <button className={styles.close_button} onClick={onClick}>
            +
          </button>
          <p className={styles.message}>
            Sorry, nothing found. Please, try again!
          </p>
        </div>
      )}
      <Outlet />
    </section>
  );
}
