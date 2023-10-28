import React, { Component } from 'react';
import styles from './App.module.scss';

export class App extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      this.setState({
        inputValue: e.target.value,
      });
    }
  };

  handleSearchButton = () => {
    alert(this.state.inputValue);
  };

  render() {
    return (
      <>
        <header className={styles.header}>
          <div className={styles.container}>
            <input
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
            <button onClick={this.handleSearchButton}>Search</button>
          </div>
        </header>
      </>
    );
  }
}
