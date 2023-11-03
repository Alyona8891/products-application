import { getPagesArr } from '../../utils/getPagesArr';
import styles from './Pagination.module.scss';

export function Pagination(props: {
  currentPage: number;
  productCount: number;
  productsOnPage: number;
  onClick: (currentPage: number) => void;
}): React.ReactElement {
  const { currentPage, productCount, productsOnPage, onClick } = props;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1 ? true : false}
        onClick={(): void => onClick(currentPage - 1)}
      >
        -
      </button>
      {getPagesArr(productCount, productsOnPage).map((page) => {
        return (
          <button
            key={page}
            type="button"
            className={
              currentPage === page
                ? `${styles.button} ${styles.button_active}`
                : styles.button
            }
            onClick={(): void => onClick(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.button}
        disabled={
          currentPage === getPagesArr(productCount, productsOnPage).length
            ? true
            : false
        }
        onClick={(): void => onClick(currentPage + 1)}
      >
        +
      </button>
    </div>
  );
}
