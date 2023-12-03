import styles from './UncontrolledPage.module.scss';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';

export function UncontrolledPage(): React.ReactElement {
  return (
    <>
      <header />
      <main className={styles.main}>
        <div className={styles.container}>
          <RegistrationForm />
        </div>
      </main>
      <footer />
    </>
  );
}
