import { useContext } from 'react';
import { getPagesArr } from '../../../../../utils/getPagesArr';
import styles from './Pagination.module.scss';
import { ProductsContext } from '../../../../ProductsContext/ProductsContext';

export function Pagination(props: {
  currentPage: number;
  productsOnPage: number;
  onClick: (currentPage: number) => void;
}): React.ReactElement {
  const { currentPage, productsOnPage, onClick } = props;
  const context = useContext(ProductsContext);
  const { productsData } = context;
  const productCount = productsData.total;

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
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
        }
        onClick={(): void => onClick(currentPage + 1)}
      >
        +
      </button>
    </div>
  );
}
