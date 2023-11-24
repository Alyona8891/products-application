import { getPagesArr } from '../../../../../utils/getPagesArr';
import styles from './Pagination.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useFetchProductsQuery } from '../../../../store/utils/api';
import { useSearchParams } from 'next/navigation';

export function Pagination(props: { currentPage: number }): React.ReactElement {
  const { currentPage } = props;
  const location = useSearchParams();

  const handleQueryChange = (param: string, value: number) => {
    const params = new URLSearchParams(location);
    params.set(param, value.toString());
    return params.toString();
  };

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
    handleQueryChange('page', currentPage);
    refetch();
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
