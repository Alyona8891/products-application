import React, { Component } from 'react';
import styles from './App.module.scss';
import { Cards } from './components/Cards/Cards';
import { Loader } from './components/Loader/Loader';

export class App extends Component {
  state = {
    inputValue: this.setInputValue(),
    cards: [],
    isLoading: true,
  };

  setInputValue() {
    const keyWord = localStorage.getItem('alyona8891_keyword');
    if (keyWord) {
      return keyWord;
    } else {
      return '';
    }
  }

  componentDidMount(): void {
    const keyWord = localStorage.getItem('alyona8891_keyword');
    if (keyWord) {
      fetch(`https://dummyjson.com/products/search?q=${keyWord}`)
        .then((res) => res.json())
        .then((json) =>
          this.setState({
            isLoading: false,
            cards: json.products,
          })
        );
    } else {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((json) =>
          this.setState({
            isLoading: false,
            cards: json.products,
          })
        );
    }
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target) {
      this.setState({
        inputValue: e.target.value,
      });
    }
  };

  handleSearchButton = () => {
    this.setLocalStorageData();
    fetch(`https://dummyjson.com/products/search?q=${this.state.inputValue}`)
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          cards: json.products,
        })
      );
  };

  setLocalStorageData = () => {
    localStorage.setItem('alyona8891_keyword', this.state.inputValue);
  };

  render() {
    return (
      <>
        <header className={styles.header}></header>
        <main className={styles.main}>
          <section className={styles.search_section}>
            <form className={styles.form}>
              <label className={styles.label} htmlFor="search_input">
                Enter keyword to search
              </label>
              <input
                id="search_input"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
              <button onClick={this.handleSearchButton} type="submit">
                Search
              </button>
            </form>
          </section>
          <section className={styles.cards_section}>
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <Cards cards={this.state.cards} />
            )}
          </section>
        </main>
        <footer className={styles.footer}></footer>
      </>
    );
  }
}
