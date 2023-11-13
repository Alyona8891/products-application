import { FormEvent, useContext, useEffect } from 'react';
import styles from './SearchBlock.module.scss';
import { setLocalStorageData } from '../../../../../utils/setLocalStorageData';
import { getKeyWord } from '../../../../../utils/getKeyWord';
import { AppContext } from '../../../../AppContext/AppContext';
import { DEFAULT_CURRENT_PAGE } from '../../../../../constants/constants';

export function SearchBlock(props: {
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { handleQueryChange } = props;
  const context = useContext(AppContext);
  const { inputValue, setInputValue, quantityProductsOnPage, getProductsData } =
    context;

  useEffect(() => {
    setInputValue(getKeyWord());
  }, [setInputValue]);

  const handleSearchButton = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLocalStorageData(inputValue);
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    getProductsData(inputValue, DEFAULT_CURRENT_PAGE, quantityProductsOnPage);
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
        onChange={(e) => setInputValue(e.target.value)}
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
