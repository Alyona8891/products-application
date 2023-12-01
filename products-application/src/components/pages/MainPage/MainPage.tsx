import { UserCard } from '../../UI/UserCard/UserCard';
import styles from './MainPage.module.scss';
const data = [
  {
    id: 1,
    name: 'Alena',
    age: 35,
    email: 'besssta888@mail.ru',
    password: '12345678',
    gender: 'female',
    country: 'belarus',
  },
  {
    id: 2,
    name: 'Alena',
    age: 35,
    email: 'besssta888@mail.ru',
    password: '12345678',
    gender: 'female',
    country: 'belarus',
  },
];

export function MainPage(): React.ReactElement {
  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.container}>
          {data.map((user) => {
            return <UserCard user={user} key={user.id} />;
          })}
        </div>
      </main>
      <footer className={styles.footer} />
    </>
  );
}
