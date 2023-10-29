import { Component } from 'react';
import styles from './Loader.module.scss';

export class Loader extends Component {
  render() {
    return (
      <div className={styles.loader}>
        <p className={styles.text}>Loading</p>
        <div className={styles.loading_dots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
      </div>
    );
  }
}
