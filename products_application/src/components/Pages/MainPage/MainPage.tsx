import { useEffect, useState } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './SearchSection/SearchSection';
import { CardsSection } from './CardsSection/CardsSection';
import { fetchProducts } from '../../../utils/fetchProducts';
import { IProduct } from '../../../types/types';
import { searchProducts } from '../../../utils/searchProducts';
import { getKeyWord } from '../../../utils/getKeyWord';

export function MainPage(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(keyWord, setIsLoading)
      : fetchProducts(setIsLoading)
    ).then((data) => {
      if (data) {
        setIsLoading(false);
        setProducts(data.products);
      }
    });
  }, []);

  const handleSearchButton = (keyWord: string): void => {
    setIsLoading(true);
    searchProducts(keyWord, setIsLoading).then((data) => {
      if (data) {
        setIsLoading(false);
        setProducts(data.products);
      }
    });
  };

  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <SearchSection onSubmit={handleSearchButton} />
        {isLoading ? <Loader /> : <CardsSection products={products} />}
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
