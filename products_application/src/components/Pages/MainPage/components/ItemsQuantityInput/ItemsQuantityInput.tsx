import styles from './ItemsQuantityInput.module.scss';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../../../../../constants/constants';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from '../../../../store/store';
import { useSelector } from 'react-redux';
import { setProductsOnPage } from '../../../../store/reducers/productsReducer';

export default function ItemQuantityInput(props: {
  handleQueryChange: (
    search: string,
    page: number,
    limit: number,
    details?: number
  ) => void;
  productsOnPage: number;
}): React.ReactElement {
  const { handleQueryChange, productsOnPage } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const keyword = useSelector((state: RootState) => state.products.searchValue);

  const handleItemsQuantityInput = (value: number): void => {
    handleQueryChange(keyword, DEFAULT_CURRENT_PAGE, value);
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <label className={styles.label} htmlFor="quantity_input">
        Enter number of items shown per page
      </label>
      <input
        autoComplete="off"
        className={styles.input}
        value={productsOnPage}
        placeholder={DEFAULT_ITEMS_QUANTITY.toString()}
        onChange={(e) => {
          e.target.disabled = true;
          const target = +e.target.value;
          if (target > 0) {
            dispatch(setProductsOnPage(+e.target.value));
          }
          if (target === 0) {
            dispatch(setProductsOnPage(DEFAULT_ITEMS_QUANTITY));
          }
          handleItemsQuantityInput(target);
          e.target.disabled = false;
        }}
      />
    </form>
  );
}
