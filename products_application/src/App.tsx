import React, { Component } from 'react';
import styles from './App.module.scss';
import { Cards } from './components/Cards/Cards';

export class App extends Component {
  state = {
    inputValue: '',
    cards: [
      { id: '1', title: 'apple', text: 'kjfirjifrifirjfrijfirjfirjf' },
      { id: '2', title: 'orange', text: 'kjfirjifrifirjfrijfirjfirjf' },
    ],
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
        <main className={styles.main}>
          <div className={styles.container}>
            <Cards cards={this.state.cards} />
          </div>
        </main>
      </>
    );
  }
}
