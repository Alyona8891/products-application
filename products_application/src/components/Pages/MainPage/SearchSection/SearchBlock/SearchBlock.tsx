import { FormEvent, useState } from 'react';
import styles from './SearchBlock.module.scss';

export function SearchBlock(props: {
  onSubmit: () => void;
}): React.ReactElement {
  const { onSubmit } = props;

  const [inputValue, setInputValue] = useState('');

  const handleSearchButton = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
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
