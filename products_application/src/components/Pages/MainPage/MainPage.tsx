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
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<{
    productsArr: IProduct[];
    totalCount: number;
  }>({ productsArr: [], totalCount: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(keyWord, setIsLoading)
      : fetchProducts(setIsLoading, 1, 10)
    ).then((data) => {
      if (data) {
        setIsLoading(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  }, []);

  const handleSearchButton = (keyWord: string): void => {
    setIsLoading(true);
    searchProducts(keyWord, setIsLoading).then((data) => {
      if (data) {
        setIsLoading(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  const handlePaginationButton = (currentPage: number): void => {
    setIsLoading(true);
    setCurrentPage(currentPage);
    fetchProducts(setIsLoading, currentPage, 10).then((data) => {
      if (data) {
        setIsLoading(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <SearchSection onSubmit={handleSearchButton} />
        {isLoading ? (
          <Loader />
        ) : (
          <CardsSection
            products={products.productsArr}
            currentPage={currentPage}
            productCount={products.totalCount}
            productsOnPage={10}
            onClick={handlePaginationButton}
          />
        )}
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
