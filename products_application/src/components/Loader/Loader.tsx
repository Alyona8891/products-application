import styles from './Loader.module.scss';

export function Loader(): React.ReactElement {
  return (
    <div className={styles.loader}>
      <p className={styles.text}>Loading</p>
      <div className={styles.loading_dots}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
    </div>
  );
}
