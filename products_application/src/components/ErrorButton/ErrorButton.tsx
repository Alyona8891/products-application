import React, { useState } from 'react';
import styles from './ErrorButton.module.scss';

export function ErrorButton(): React.ReactElement {
  const [isCrashed, setIsCrashed] = useState(false);

  const handleErrorButton = () => {
    setIsCrashed(true);
  };

  if (isCrashed) {
    throw new Error('Crashing the app!');
  }

  return (
    <button className={styles.error_button} onClick={handleErrorButton}>
      Throw Error
    </button>
  );
}
