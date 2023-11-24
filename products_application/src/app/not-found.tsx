import styles from './NotFoundPage.module.scss';

export default function NotFoundPage(): React.ReactElement {
  return (
    <main>
      <h3 className={styles.message}>
        Something went wrong. Please, try later!
      </h3>
    </main>
  );
}