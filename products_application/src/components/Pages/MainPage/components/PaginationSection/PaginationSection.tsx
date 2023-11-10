import { ItemQuantityInput } from '../ItemsQuantityInput/ItemsQuantityInput';
import { Pagination } from '../Pagination/Pagination';
import styles from './PaginationSection.module.scss';

export function PagintionSection(props: {
  productsOnPage: number;
  currentPage: number;
  onClick: (currentPage: number) => void;
  onInput: (keyWord: number) => void;
}): React.ReactElement {
  const { productsOnPage, currentPage, onClick, onInput } = props;

  return (
    <section className={styles.pagination_section}>
      <ItemQuantityInput onInput={onInput} />
      <Pagination
        productsOnPage={productsOnPage}
        currentPage={currentPage}
        onClick={onClick}
      />
    </section>
  );
}
