import { useEffect, useState } from 'react';
import { Loader } from '../../Loader/Loader';
import styles from './MainPage.module.scss';
import { SearchSection } from './SearchSection/SearchSection';
import { CardsSection } from './CardsSection/CardsSection';
import { fetchProducts } from '../../../utils/fetchProducts';
import { IProduct } from '../../../types/types';
import { searchProducts } from '../../../utils/searchProducts';
import { getKeyWord } from '../../../utils/getKeyWord';
import { PagintionSection } from './PaginationSection/PaginationSection';
import {
  DEFAULT_CURRENT_PAGE,
  DEFAULT_ITEMS_QUANTITY,
} from '../../../constants/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchProduct } from '../../../utils/fetchProduct';
import { Details } from '../../Details/Details';

export function MainPage(): React.ReactElement {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isLoadingPagination, setIsLoadingPagination] = useState(true);
  const [products, setProducts] = useState<{
    productsArr: IProduct[];
    totalCount: number;
  }>({ productsArr: [], totalCount: 0 });
  const [quantityProductsOnPage, setProductsOnPage] = useState(
    DEFAULT_ITEMS_QUANTITY
  );
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;
  const currentCard = Number(queryParameters.get('details')) || null;
  const [openedProduct, setOpenedProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    const keyWord = getKeyWord();
    if (currentCard) {
      fetchProduct(currentCard, setIsLoadingProduct).then((data) => {
        console.log(data);
        if (data) {
          setOpenedProduct({
            id: data.id,
            title: data.title,
            text: data.text,
            images: data.images,
            description: data.description,
          });
          setIsLoadingProduct(false);
        }
      });
    }
    (keyWord
      ? searchProducts(
          keyWord,
          setIsLoadingProducts,
          setIsLoadingPagination,
          currentPage,
          quantityProductsOnPage
        )
      : fetchProducts(
          setIsLoadingProducts,
          setIsLoadingPagination,
          currentPage,
          quantityProductsOnPage
        )
    ).then((data) => {
      if (data) {
        setIsLoadingPagination(false);
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  }, [currentCard, currentPage, quantityProductsOnPage]);

  const handleCard = (id: number): void => {
    handleQueryChange('page', currentPage);
    handleQueryChange('details', id);
    fetchProduct(id, setIsLoadingProduct).then((data) => {
      if (data) {
        setOpenedProduct({
          id: data.id,
          title: data.title,
          text: data.text,
          images: data.images,
          description: data.description,
        });
        setIsLoadingProduct(false);
      }
    });
  };

  const handleSearchButton = (keyWord: string): void => {
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    searchProducts(
      keyWord,
      setIsLoadingProducts,
      setIsLoadingPagination,
      DEFAULT_CURRENT_PAGE,
      quantityProductsOnPage
    ).then((data) => {
      if (data) {
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  const handleCloseButton = (): void => {
    setIsLoadingProduct(true);
    queryParameters.delete('details');
    navigate({ search: queryParameters.toString() });
    setOpenedProduct(null);
  };

  const handleItemsQuantityInput = (quantity: number): void => {
    setIsLoadingProducts(true);
    setProductsOnPage(quantity);
    handleQueryChange('page', DEFAULT_CURRENT_PAGE);
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(
          keyWord,
          setIsLoadingProducts,
          setIsLoadingPagination,
          DEFAULT_CURRENT_PAGE,
          quantity
        )
      : fetchProducts(
          setIsLoadingProducts,
          setIsLoadingPagination,
          DEFAULT_CURRENT_PAGE,
          quantity
        )
    ).then((data) => {
      if (data) {
        setIsLoadingPagination(false);
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  const handleQueryChange = (param: string, value: number) => {
    queryParameters.set(`${param}`, value.toString());
    navigate({ search: queryParameters.toString() });
  };

  const handlePaginationButton = (currentPage: number): void => {
    setIsLoadingProducts(true);
    handleQueryChange('page', currentPage);
    const keyWord = getKeyWord();
    (keyWord
      ? searchProducts(
          keyWord,
          setIsLoadingProducts,
          setIsLoadingPagination,
          currentPage,
          quantityProductsOnPage
        )
      : fetchProducts(
          setIsLoadingProducts,
          setIsLoadingPagination,
          currentPage,
          quantityProductsOnPage
        )
    ).then((data) => {
      if (data) {
        setIsLoadingProducts(false);
        setProducts({ productsArr: data.products, totalCount: data.total });
      }
    });
  };

  return (
    <>
      <header className={styles.header} />
      <main className={styles.main}>
        <SearchSection onSubmit={handleSearchButton} />
        {!isLoadingPagination && (
          <PagintionSection
            currentPage={currentPage}
            productCount={products.totalCount}
            productsOnPage={quantityProductsOnPage}
            onClick={handlePaginationButton}
            onInput={handleItemsQuantityInput}
          />
        )}
        {isLoadingProducts ? (
          <Loader />
        ) : (
          <CardsSection products={products.productsArr} onClick={handleCard} />
        )}
        {currentCard && (
          <Details
            product={openedProduct}
            isLoadingProduct={isLoadingProduct}
            onClick={handleCloseButton}
          />
        )}
      </main>
      <footer className={styles.footer} />
    </>
  );
}
