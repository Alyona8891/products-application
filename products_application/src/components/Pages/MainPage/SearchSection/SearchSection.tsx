import { ErrorButton } from '../../../ErrorButton/ErrorButton';
import { SearchBlock } from './SearchBlock/SearchBlock';
import styles from './SearchSection.module.scss';

export function SearchSection(props: {
  onSubmit: (keyWord: string) => void;
}): React.ReactElement {
  const { onSubmit } = props;
  return (
    <section className={styles.search_section}>
      <ErrorButton />
      <SearchBlock onSubmit={onSubmit} />
    </section>
  );
}
