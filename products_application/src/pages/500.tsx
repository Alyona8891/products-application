import styles from './NotFoundPage.module.scss';

export default function ErrorPage(): React.ReactElement {
  return (
    <main>
      <h3 className={styles.message}>
        Something went wrong with server. Please, try later!
      </h3>
    </main>
  );
}
