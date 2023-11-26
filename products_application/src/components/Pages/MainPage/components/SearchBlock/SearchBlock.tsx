import { FormEvent, useEffect } from 'react';
import styles from './SearchBlock.module.scss';
import { DEFAULT_CURRENT_PAGE } from '../../../../../constants/constants';
import { useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from '../../../../store/store';
import { setSearchValue } from '../../../../store/reducers/productsReducer';

export default function SearchBlock(props: {
  handleQueryChange: (search: string, page: number) => void;
  keyword: string;
}): React.ReactElement {
  const { handleQueryChange, keyword } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const inputValue = useSelector(
    (state: RootState) => state.products.searchValue
  );

  const handleSearchButton = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleQueryChange(inputValue, DEFAULT_CURRENT_PAGE);
  };

  useEffect(() => {
    dispatch(setSearchValue(keyword));
  }, [dispatch, keyword]);

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
