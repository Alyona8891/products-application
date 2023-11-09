import { FormEvent, useEffect, useState } from 'react';
import styles from './SearchBlock.module.scss';
import { setLocalStorageData } from '../../../../../utils/setLocalStorageData';
import { getKeyWord } from '../../../../../utils/getKeyWord';

export function SearchBlock(props: {
  onSubmit: (keyWord: string) => void;
}): React.ReactElement {
  const { onSubmit } = props;

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(getKeyWord());
  }, []);

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
