import { IUserState } from '../../../types/types';

export function UserCard(props: {
  styles: CSSModuleClasses;
  user: IUserState;
}): React.ReactElement {
  const { styles, user } = props;

  return (
    <div className={styles.wrapper}>
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
        <img className={styles.image} src={user.image} />
      </div>
    </div>
  );
}
