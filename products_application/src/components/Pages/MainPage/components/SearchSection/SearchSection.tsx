import { ErrorButton } from '../../../../ErrorButton/ErrorButton';
import { SearchBlock } from '../SearchBlock/SearchBlock';
import styles from './SearchSection.module.scss';

export function SearchSection(): React.ReactElement {
  return (
    <section className={styles.search_section}>
      <ErrorButton />
      <SearchBlock />
    </section>
  );
}
