import { FormEvent, useContext, useEffect } from 'react';
import styles from './SearchBlock.module.scss';
import { setLocalStorageData } from '../../../../../utils/setLocalStorageData';
import { getKeyWord } from '../../../../../utils/getKeyWord';
import { ProductsContext } from '../../../../ProductsContext/ProductsContext';

export function SearchBlock(props: {
  onSubmit: (keyWord: string) => void;
}): React.ReactElement {
  const { onSubmit } = props;
  const context = useContext(ProductsContext);
  const { inputValue, setInputValue } = context;

  useEffect(() => {
    setInputValue(getKeyWord());
  }, [setInputValue]);

  const handleSearchButton = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLocalStorageData(inputValue);
    onSubmit(inputValue);
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
      />
      <button className={styles.search_button} type="submit">
        Search
      </button>
    </form>
  );
}
