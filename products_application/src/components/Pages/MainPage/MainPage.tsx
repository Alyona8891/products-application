import { useState } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './SearchSection/SearchSection';

export function MainPage(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitButton = (): void => {
    setIsLoading(true);
  };

  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <SearchSection onSubmit={handleSubmitButton} />
        {isLoading ? (
          <Loader />
        ) : (
          <section className={styles.cards_section}>Cards section</section>
        )}
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
