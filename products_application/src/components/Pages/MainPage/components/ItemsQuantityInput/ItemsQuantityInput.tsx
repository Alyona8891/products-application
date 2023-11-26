import styles from './ItemsQuantityInput.module.scss';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../../../../../constants/constants';
import { useSearchParams } from 'next/navigation';

export default function ItemQuantityInput(): React.ReactElement {
  const location = useSearchParams();

  const handleQueryChange = (param: string, value: number) => {
    const params = new URLSearchParams(location);
    params.set(param, value.toString());
    return params.toString();
  };

  const handleItemsQuantityInput = (): void => {
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <label className={styles.label} htmlFor="quantity_input">
        Enter number of items shown per page
      </label>
      <input
        autoComplete="off"
        className={styles.input}
        //value={productsOnPage}
        placeholder={DEFAULT_ITEMS_QUANTITY.toString()}
        onChange={(e) => {
          e.target.disabled = true;
          const target = +e.target.value;
          if (target > 0) {
            handleItemsQuantityInput(+e.target.value);
          }
          if (target === 0) {
            handleItemsQuantityInput(DEFAULT_ITEMS_QUANTITY);
          }
          e.target.disabled = false;
        }}
      />
    </form>
  );
}
