import { Link } from 'react-router-dom';
import styles from './UncontrolledPage.module.scss';
import { RegistrationForm } from './components/RegistrationForm/UncontrolledRegistrationForm';

export function UncontrolledPage(): React.ReactElement {
  return (
    <>
      <header className={styles.header}>
        <nav>
          <Link to="/main">Main Page</Link>
          <Link to="/controlled">Controlled Form</Link>
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
