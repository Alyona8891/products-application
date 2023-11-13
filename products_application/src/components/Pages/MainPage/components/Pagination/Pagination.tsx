import { useContext } from 'react';
import { getPagesArr } from '../../../../../utils/getPagesArr';
import styles from './Pagination.module.scss';
import { AppContext } from '../../../../AppContext/AppContext';
import { getKeyWord } from '../../../../../utils/getKeyWord';

export function Pagination(props: {
  currentPage: number;
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { currentPage, handleQueryChange } = props;
  const context = useContext(AppContext);
  const {
    productsData,
    getProductsData,
    setIsLoadingProducts,
    quantityProductsOnPage,
  } = context;
  const productCount = productsData.total;

  const handlePaginationButton = (currentPage: number): void => {
    setIsLoadingProducts(true);
    handleQueryChange('page', currentPage);
    const keyWord = getKeyWord();
    getProductsData(keyWord, currentPage, quantityProductsOnPage);
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        disabled={currentPage === 1}
        onClick={(): void => handlePaginationButton(currentPage - 1)}
        data-testid="prevPage"
      >
        -
      </button>
      {getPagesArr(productCount, quantityProductsOnPage).map((page) => {
        return (
          <button
            key={page}
            type="button"
            className={
              currentPage === page
                ? `${styles.button} ${styles.button_active}`
                : styles.button
            }
            onClick={(): void => handlePaginationButton(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.button}
        disabled={
          currentPage ===
          getPagesArr(productCount, quantityProductsOnPage).length
        }
        onClick={(): void => handlePaginationButton(currentPage + 1)}
        data-testid="nextPage"
      >
        +
      </button>
    </div>
  );
}
