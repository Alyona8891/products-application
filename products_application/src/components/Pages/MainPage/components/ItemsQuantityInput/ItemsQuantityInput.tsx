import { useContext, useState } from 'react';
import styles from './ItemsQuantityInput.module.scss';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../../../../../constants/constants';
import { AppContext } from '../../../../AppContext/AppContext';
import { getKeyWord } from '../../../../../utils/getKeyWord';

export function ItemQuantityInput(props: {
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { handleQueryChange } = props;

  const [inputValue, setInputValue] = useState<number | string>(
    DEFAULT_ITEMS_QUANTITY
  );

  const context = useContext(AppContext);
  const { setIsLoadingProducts, setProductsOnPage, getProductsData } = context;

  const handleItemsQuantityInput = (quantity: number): void => {
    setIsLoadingProducts(true);
    setProductsOnPage(quantity);
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    const keyWord = getKeyWord();
    getProductsData(keyWord, DEFAULT_CURRENT_PAGE, quantity);
  };

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
            handleItemsQuantityInput(+e.target.value);
          }
          if (target === 0) {
            setInputValue('');
            handleItemsQuantityInput(DEFAULT_ITEMS_QUANTITY);
          }
          e.target.disabled = false;
        }}
      />
    </form>
  );
}
