import { getPagesArr } from '../../../../../utils/getPagesArr';
import styles from './Pagination.module.scss';
import { getKeyWord } from '../../../../../utils/getKeyWord';
import { useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from '../../../../store/store';
import { fetchProducts } from '../../../../store/utils/api';

export function Pagination(props: {
  currentPage: number;
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { currentPage, handleQueryChange } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const totalQuantity = useSelector(
    (state: RootState) => state.products.totalQuantity
  );

  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const handlePaginationButton = (currentPage: number): void => {
    handleQueryChange('page', currentPage);
    const keyWord = getKeyWord();
    dispatch(
      fetchProducts({
        keyword: keyWord,
        currentPage: currentPage,
        productsOnPage: productsOnPage,
      })
    );
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
