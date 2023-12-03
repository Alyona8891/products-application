import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export function Header(): React.ReactElement {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/main" className={styles.link}>
          Main Page
        </Link>
        <Link to="/controlled" className={styles.link}>
          Controlled Form
        </Link>
        <Link to="/uncontrolled" className={styles.link}>
          Uncontrolled Form
        </Link>
      </nav>
    </header>
  );
}
