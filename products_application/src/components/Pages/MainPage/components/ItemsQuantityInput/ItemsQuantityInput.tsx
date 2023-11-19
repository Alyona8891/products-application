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
import { setProductsOnPage } from '../../../../store/reducers/productsReducer';
import { useSelector } from 'react-redux';
import { useFetchProductsQuery } from '../../../../store/utils/api';

export function ItemQuantityInput(props: {
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { handleQueryChange } = props;

  const productsOnPage = useSelector(
    (state: RootState) => state.products.productsOnPage
  );

  const dispatch: AppDispatch = useAppDispatch();

  const { refetch } = useFetchProductsQuery({
    currentPage: DEFAULT_CURRENT_PAGE,
    productsOnPage,
  });

  const handleItemsQuantityInput = (quantity: number): void => {
    dispatch(setProductsOnPage(quantity));
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    refetch();
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
