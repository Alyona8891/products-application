import { useSelector } from 'react-redux';
import { UserCard } from '../../UI/UserCard/UserCard';
import styles from './MainPage.module.scss';
import { RootState } from '../../store/store';
import { Link } from 'react-router-dom';

export function MainPage(): React.ReactElement {
  const users = useSelector((state: RootState) => state.users.users);
  return (
    <>
      <header className={styles.header}>
        <nav>
          <Link to="/uncontrolled">Uncontrolled Form</Link>
          <Link to="/controlled">Controlled Form</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          {users.length > 1 ? (
            users.slice(1, users.length).map((user, ndx) => {
              return <UserCard styles={styles} user={user} key={ndx} />;
            })
          ) : (
            <h2>gooo</h2>
          )}
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
