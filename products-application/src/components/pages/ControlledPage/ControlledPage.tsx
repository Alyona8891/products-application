import styles from './ControlledPage.module.scss';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';

export function ControlledPage(): React.ReactElement {
  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <div className={styles.container}>
          <RegistrationForm />
        </div>
      </main>
      <footer />
    </>
  );
}
