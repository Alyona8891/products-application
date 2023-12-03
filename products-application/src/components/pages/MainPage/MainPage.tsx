import { useSelector } from 'react-redux';
import { UserCard } from '../../UI/UserCard/UserCard';
import styles from './MainPage.module.scss';
import { RootState } from '../../store/store';
import { Header } from '../../UI/Header/Header';

export function MainPage(): React.ReactElement {
  const users = useSelector((state: RootState) => state.users.users);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {users.length > 1 ? (
            users.slice(1, users.length).map((user, ndx) => {
              return <UserCard styles={styles} user={user} key={ndx} />;
            })
          ) : (
            <h2 className={styles.message}>
              There is no information available. Please, fill out any of the
              suggested forms
            </h2>
          )}
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
