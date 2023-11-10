import { ErrorButton } from '../../../../ErrorButton/ErrorButton';
import { SearchBlock } from '../SearchBlock/SearchBlock';
import styles from './SearchSection.module.scss';

export function SearchSection(props: {
  handleQueryChange: (param: string, value: number) => void;
}): React.ReactElement {
  const { handleQueryChange } = props;
  return (
    <section className={styles.search_section}>
      <ErrorButton />
      <SearchBlock handleQueryChange={handleQueryChange} />
    </section>
  );
}
