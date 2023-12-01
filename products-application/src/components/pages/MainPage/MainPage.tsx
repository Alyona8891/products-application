import styles from "./MainPage.module.scss";

export function MainPage(): React.ReactElement {
  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>Main Page</main>
      <footer className={styles.footer} />
    </>
  );
}
