import { getPagesArr } from '../../utils/getPagesArr';
import styles from './Pagination.module.scss';

export function Pagination(): React.ReactElement {
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.button}
        onClick={(): void => console.log(1)}
      >
        -
      </button>
      {getPagesArr(100, 10).map((page) => {
        return (
          <button
            key={page}
            type="button"
            className={styles.button}
            onClick={(): void => console.log(2)}
          >
            {page}
          </button>
        );
      })}
      <button
        type="button"
        className={styles.button}
        onClick={(): void => console.log(3)}
      >
        +
      </button>
    </div>
  );
}
