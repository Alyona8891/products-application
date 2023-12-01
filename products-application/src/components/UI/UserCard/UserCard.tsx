import { IUser } from '../../../types/types';
import styles from './UserCard.module.scss';

export function UserCard(props: { user: IUser }): React.ReactElement {
  const { user } = props;

  return (
    <div className={styles.container}>
      <div className={styles.block}>
        <div className={styles.label}>Name:</div>
        <div className={styles.text}>{user.name}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>Age:</div>
        <div className={styles.text}>{user.age}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>Email:</div>
        <div className={styles.text}>{user.email}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>Password:</div>
        <div className={styles.text}>{user.password}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>Gender:</div>
        <div className={styles.text}>{user.gender}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>Country:</div>
        <div className={styles.text}>{user.country}</div>
      </div>
      <div className={styles.block}>
        <div className={styles.label}>Photo:</div>
      </div>
    </div>
  );
}
