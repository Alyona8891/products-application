import { ErrorButton } from '../../../../ErrorButton/ErrorButton';
import SearchBlock from '../SearchBlock/SearchBlock';
import styles from './SearchSection.module.scss';

export function SearchSection(props: {
  handleQueryChange: (
    search: string,
    page: number,
    productsOnPage: number
  ) => void;
  keyword: string;
}): React.ReactElement {
  const { handleQueryChange, keyword } = props;
  return (
    <section className={styles.search_section}>
      <ErrorButton />
      <SearchBlock handleQueryChange={handleQueryChange} keyword={keyword} />
    </section>
  );
}
