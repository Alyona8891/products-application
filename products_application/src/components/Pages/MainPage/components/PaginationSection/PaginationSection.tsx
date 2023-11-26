import ItemQuantityInput from '../ItemsQuantityInput/ItemsQuantityInput';
import Pagination from '../Pagination/Pagination';
import styles from './PaginationSection.module.scss';

export function PagintionSection(props: {
  currentPage: number;
  handleQueryChange: (
    search: string,
    page: number,
    productsOnPage: number,
    details?: number
  ) => void;
  totalQuantity: number;
  productsOnPage: number;
}): React.ReactElement {
  const { currentPage, handleQueryChange, totalQuantity, productsOnPage } =
    props;

  return (
    <section className={styles.pagination_section}>
      <ItemQuantityInput
        handleQueryChange={handleQueryChange}
        productsOnPage={productsOnPage}
      />
      <Pagination
        currentPage={currentPage}
        handleQueryChange={handleQueryChange}
        totalQuantity={totalQuantity}
        productsOnPage={productsOnPage}
      />
    </section>
  );
}
