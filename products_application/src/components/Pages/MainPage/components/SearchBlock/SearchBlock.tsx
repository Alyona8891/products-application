import { FormEvent, useEffect } from 'react';
import styles from './SearchBlock.module.scss';
import { setLocalStorageData } from '../../../../../utils/setLocalStorageData';
import { getKeyWord } from '../../../../../utils/getKeyWord';
import { DEFAULT_CURRENT_PAGE } from '../../../../../constants/constants';
import { setSearchValue } from '../../../../store/reducers/productsReducer';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from '../../../../store/store';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery } from '../../../../store/utils/api';

export function SearchBlock(props: {
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { handleQueryChange } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const inputValue = useSelector(
    (state: RootState) => state.products.searchValue
  );
  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const { refetch } = useFetchProductsQuery({
    currentPage: DEFAULT_CURRENT_PAGE,
    productsOnPage: productsOnPage,
  });

  useEffect(() => {
    dispatch(setSearchValue(getKeyWord()));
  }, [dispatch]);

  const handleSearchButton = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLocalStorageData(inputValue);
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    dispatch(setSearchValue(inputValue));
    refetch();
  };

  return (
    <form className={styles.form} onSubmit={handleSearchButton}>
      <label className={styles.label} htmlFor="search_input">
        Enter keyword to search
      </label>
      <input
        autoComplete="off"
        className={styles.input}
        id="search_input"
        value={inputValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        data-testid="searchInput"
      />
      <button
        className={styles.search_button}
        type="submit"
        data-testid="searchButton"
      >
        Search
      </button>
    </form>
  );
}
