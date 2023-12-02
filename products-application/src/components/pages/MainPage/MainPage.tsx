import { useSelector } from 'react-redux';
import { UserCard } from '../../UI/UserCard/UserCard';
import styles from './MainPage.module.scss';
import { RootState } from '../../store/store';

export function MainPage(): React.ReactElement {
  const users = useSelector((state: RootState) => state.users.users);
  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.container}>
          {users.map((user, ndx) => {
            return <UserCard user={user} key={ndx} />;
          })}
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
