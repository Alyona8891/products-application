import styles from './Details.module.scss';
import { IProduct } from '../../types/types';

export function Details(props: {
  data: IProduct;
  handleQueryChange: (
    search?: string,
    page?: number,
    productsOnPage?: number,
    details?: number
  ) => void;
}): React.ReactElement {
  const { data, handleQueryChange } = props;

  return (
    <section className={styles.details} data-testid="details">
      <div
        className={styles.shadow}
        onClick={() => handleQueryChange(undefined, undefined, undefined, 0)}
      />
      {data?.title ? (
        <div className={styles.container}>
          <button
            onClick={() =>
              handleQueryChange(undefined, undefined, undefined, 0)
            }
            className={styles.close_button}
            data-testid="closeButton"
          >
            +
          </button>
          <img
            className={styles.image}
            src={data.images[0]}
            alt="detail image"
          />
          <h3 className={styles.title}>{data.title}</h3>
          <p className={styles.text}>{data.description}</p>
        </div>
      ) : (
        <div className={styles.container}>
          <button
            onClick={() =>
              handleQueryChange(undefined, undefined, undefined, 0)
            }
            className={styles.close_button}
            data-testid="closeButton"
          >
            +
          </button>
          <p className={styles.message}>
            Sorry, nothing found. Please, try again!
          </p>
        </div>
      )}
    </section>
  );
}
