import React, { Component } from 'react';
import styles from './App.module.scss';
import { Cards } from './components/Cards/Cards';
import { Loader } from './components/Loader/Loader';
import { ErrorButton } from './components/ErrorButton/ErrorButton';
import { IAppState } from './types';

export class App extends Component<object, IAppState, string> {
  state = {
    inputValue: this.setInputValue(),
    cards: [],
    isLoading: true,
    isNothingFound: false,
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
        .then((json) => {
          if (json.products.length === 0) {
            this.setState({
              isLoading: false,
              cards: json.products,
              isNothingFound: true,
            });
          } else {
            this.setState({
              isLoading: false,
              cards: json.products,
            });
          }
        });
    } else {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((json) => {
          if (json.products.length === 0) {
            this.setState({
              isLoading: false,
              cards: json.products,
              isNothingFound: true,
            });
          } else {
            this.setState({
              isLoading: false,
              cards: json.products,
            });
          }
        });
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

  handleErrorButton = () => {
    throw new Error('Crashing the app!!');
  };

  render() {
    return (
      <>
        <header className={styles.header}></header>
        <main className={styles.main}>
          <section className={styles.search_section}>
            <ErrorButton />
            <form className={styles.form}>
              <label className={styles.label} htmlFor="search_input">
                Enter keyword to search
              </label>
              <input
                className={styles.input}
                id="search_input"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
              <button
                className={styles.search_button}
                onClick={this.handleSearchButton}
                type="submit"
              >
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
            {this.state.isNothingFound && (
              <p className={styles.message}>
                Sorry, nothing found. Please, try again!
              </p>
            )}
          </section>
        </main>
        <footer className={styles.footer}></footer>
      </>
    );
  }
}
