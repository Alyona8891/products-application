import { Pagination } from '../../../Pagination/Pagination';
import styles from './PaginationSection.module.scss';

export function PagintionSection(props: {
  productCount: number;
  productsOnPage: number;
  currentPage: number;
  onClick: (currentPage: number) => void;
}): React.ReactElement {
  const { productCount, productsOnPage, currentPage, onClick } = props;
  return (
    <section className={styles.pagination_section}>
      <Pagination
        productCount={productCount}
        productsOnPage={productsOnPage}
        currentPage={currentPage}
        onClick={onClick}
      />
    </section>
  );
}
