import { Link } from 'react-router-dom';
import styles from './ControlledPage.module.scss';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';

export function ControlledPage(): React.ReactElement {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <Link to="/main">Main Page</Link>
          <Link to="/uncontrolled">Uncontrolled Form</Link>
        </nav>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          <RegistrationForm />
        </div>
      </main>
      <footer />
    </>
  );
}
