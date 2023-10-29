import { Component } from 'react';
import styles from './ErrorButton.module.scss';

export class ErrorButton extends Component<object, { error: boolean }, string> {
  state = { error: false };

  handleErrorButton = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    if (this.state.error) {
      throw new Error('Crashing the app!');
    }
    return (
      <button className={styles.error_button} onClick={this.handleErrorButton}>
        Throw Error
      </button>
    );
  }
}
