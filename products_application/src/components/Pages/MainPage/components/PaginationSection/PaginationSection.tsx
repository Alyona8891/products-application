import { ItemQuantityInput } from '../ItemsQuantityInput/ItemsQuantityInput';
import { Pagination } from '../Pagination/Pagination';
import styles from './PaginationSection.module.scss';

export function PagintionSection(props: {
  currentPage: number;
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { currentPage, handleQueryChange } = props;

  return (
    <section className={styles.pagination_section}>
      <ItemQuantityInput />
      <Pagination
        currentPage={currentPage}
        handleQueryChange={handleQueryChange}
      />
    </section>
  );
}
