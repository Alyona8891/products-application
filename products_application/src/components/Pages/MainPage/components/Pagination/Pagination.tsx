import { useSelector } from 'react-redux';
import { getPagesArr } from '../../../../../utils/getPagesArr';
import styles from './Pagination.module.scss';
import { RootState } from '../../../../store/store';

export default function Pagination(props: {
  currentPage: number;
  handleQueryChange: (
    search: string,
    page: number,
    productsOnPage: number
  ) => void;
  totalQuantity: number;
  productsOnPage: number;
}): React.ReactElement {
  const { currentPage, handleQueryChange, totalQuantity, productsOnPage } =
    props;
  const inputValue = useSelector(
    (state: RootState) => state.products.searchValue
  );

  const handlePaginationButton = (currentPage: number): void => {
    handleQueryChange(inputValue, currentPage, productsOnPage);
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
      {getPagesArr(totalQuantity, productsOnPage).map((page) => {
        return (
          <button
            type="button"
            onClick={(): void => handlePaginationButton(page)}
            className={
              currentPage === page
                ? `${styles.button} ${styles.button_active}`
                : styles.button
            }
            key={page}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.button}
        disabled={
          currentPage === getPagesArr(totalQuantity, productsOnPage).length
        }
        onClick={(): void => handlePaginationButton(currentPage + 1)}
        data-testid="nextPage"
      >
        +
      </button>
    </div>
  );
}
