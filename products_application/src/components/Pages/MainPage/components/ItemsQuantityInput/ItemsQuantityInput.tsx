import { useState } from 'react';
import styles from './ItemsQuantityInput.module.scss';
import { DEFAULT_ITEMS_QUANTITY } from '../../../../../constants/constants';

export function ItemQuantityInput(props: {
  onInput: (keyWord: number) => void;
}): React.ReactElement {
  const { onInput } = props;

  const [inputValue, setInputValue] = useState<number | string>(
    DEFAULT_ITEMS_QUANTITY
  );

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <label className={styles.label} htmlFor="quantity_input">
        Enter number of items shown per page
      </label>
      <input
        autoComplete="off"
        className={styles.input}
        value={inputValue}
        placeholder={DEFAULT_ITEMS_QUANTITY.toString()}
        onChange={(e) => {
          e.target.disabled = true;
          const target = +e.target.value;
          if (target > 0) {
            setInputValue(+e.target.value);
            onInput(+e.target.value);
          }
          if (target === 0) {
            setInputValue('');
            onInput(DEFAULT_ITEMS_QUANTITY);
          }
          e.target.disabled = false;
        }}
      />
    </form>
  );
}
