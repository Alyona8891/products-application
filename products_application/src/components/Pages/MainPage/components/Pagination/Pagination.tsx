import { getPagesArr } from '../../../../../utils/getPagesArr';
import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useFetchProductsQuery } from '../../../../store/utils/api';

export function Pagination(props: {
  currentPage: number;
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { currentPage, handleQueryChange } = props;

  const totalQuantity = useSelector(
    (state: RootState) => state.products.totalQuantity
  );

  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const { refetch } = useFetchProductsQuery({
    currentPage,
    productsOnPage,
  });

  const handlePaginationButton = (currentPage: number): void => {
    refetch();
    handleQueryChange('page', currentPage);
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
