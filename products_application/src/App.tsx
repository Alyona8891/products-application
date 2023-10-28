import React, { Component } from 'react';
import styles from './App.module.scss';
import { Cards } from './components/Cards/Cards';

export class App extends Component {
  state = {
    inputValue: '',
    cards: [],
  };

  componentDidMount(): void {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          cards: json.products,
        })
      );
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      this.setState({
        inputValue: e.target.value,
      });
    }
  };

  handleSearchButton = () => {
    fetch(`https://dummyjson.com/products/search?q=${this.state.inputValue}`)
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          cards: json.products,
        })
      );
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
