import { useState } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './SearchSection/SearchSection';
import { CardsSection } from './SearchSection/CardsSection/CardsSection';

export function MainPage(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'dknvkdkn',
      text: 'ndkvndknd',
      images: [],
      description: 'jdnv',
    },
    {
      id: 2,
      title: 'dknvkdkn',
      text: 'ndkvndknd',
      images: [],
      description: 'jdnv',
    },
  ]);

  const handleSubmitButton = (): void => {
    setIsLoading(true);
    setIsNothingFound(false);
    setProducts([
      {
        id: 1,
        title: 'dknvkdkn',
        text: 'ndkvndknd',
        images: [],
        description: 'jdnv',
      },
      {
        id: 2,
        title: 'dknvkdkn',
        text: 'ndkvndknd',
        images: [],
        description: 'jdnv',
      },
    ]);
  };

  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <SearchSection onSubmit={handleSubmitButton} />
        {isLoading ? <Loader /> : <CardsSection products={products} />}
        {isNothingFound && (
          <p className={styles.message}>
            Sorry, nothing found. Please, try again!
          </p>
        )}
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
