import styles from './MainPage.module.scss';

export function MainPage(): React.ReactElement {
  return (
    <>
      <header className={styles.header}>Header</header>
      <main className={styles.main}>
        <section className={styles.search_section}>Search section</section>
        <section className={styles.cards_section}>Cards section</section>
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
