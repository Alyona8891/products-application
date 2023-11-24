import { ItemQuantityInput } from '../ItemsQuantityInput/ItemsQuantityInput';
import { Pagination } from '../Pagination/Pagination';
import styles from './PaginationSection.module.scss';

export function PagintionSection(props: {
  currentPage: number;
}): React.ReactElement {
  const { currentPage } = props;

  return (
    <section className={styles.pagination_section}>
      <ItemQuantityInput />
      <Pagination currentPage={currentPage} />
    </section>
  );
}
