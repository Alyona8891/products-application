import styles from './Details.module.scss';
import { IProduct } from '../../types/types';
import { Loader } from '../Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEFAULT_CURRENT_PAGE } from '../../constants/constants';
import { useFetchProductQuery } from '../store/utils/api';

export function Details(): React.ReactElement {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  console.log(isLoadingProduct);
  const queryParameters = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [openedProduct, setOpenedProduct] = useState<IProduct | null>(null);
  const currentCard = Number(queryParameters.get('details')) || 0;
  const handleCloseButton = (): void => {
    setIsLoadingProduct(true);
    navigate({ search: queryParameters.toString() });
    setOpenedProduct(null);
  };
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;

  const { data, isFetching } = useFetchProductQuery(currentCard);

  useEffect(() => {
    if (currentCard > 0) {
      if (data) {
        setOpenedProduct({ ...data });
      }
      setIsLoadingProduct(false);
    }
  }, [currentCard, data]);

  return (
    <section className={styles.details} data-testid="details">
      <Link to={`/?page=${currentPage}`}>
        <div className={styles.shadow} onClick={handleCloseButton} />
      </Link>
      {isFetching ? (
        <div className={styles.container}>
          <Loader />
        </div>
      ) : openedProduct?.title ? (
        <div className={styles.container}>
          <Link
            to={`/?page=${currentPage}`}
            className={styles.close_button}
            data-testid="closeButton"
          >
            +
          </Link>
          <img
            className={styles.image}
            src={openedProduct.images[0]}
            alt="detail image"
          />
          <h3 className={styles.title}>{openedProduct.title}</h3>
          <p className={styles.text}>{openedProduct.description}</p>
        </div>
      ) : (
        <div className={styles.container}>
          <Link
            to={`/?page=${currentPage}`}
            className={styles.close_button}
            data-testid="closeButton"
          >
            +
          </Link>
          <p className={styles.message}>
            Sorry, nothing found. Please, try again!
          </p>
        </div>
      )}
    </section>
  );
}
