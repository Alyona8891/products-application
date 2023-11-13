import styles from './Details.module.scss';
import { IProduct } from '../../types/types';
import { Loader } from '../Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DEFAULT_CURRENT_PAGE } from '../../constants/constants';
import { getProduct } from '../../utils/api';

export function Details(): React.ReactElement {
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const queryParameters = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [openedProduct, setOpenedProduct] = useState<IProduct | null>(null);
  const currentCard = Number(queryParameters.get('details')) || null;
  const handleCloseButton = (): void => {
    setIsLoadingProduct(true);
    navigate({ search: queryParameters.toString() });
    setOpenedProduct(null);
  };
  const currentPage =
    Number(queryParameters.get('page')) || DEFAULT_CURRENT_PAGE;

  useEffect(() => {
    if (currentCard) {
      getProduct(currentCard).then((data) => {
        if (data) {
          setOpenedProduct({ ...data });
        }
        setIsLoadingProduct(false);
      });
    }
  }, [currentCard]);

  return (
    <section className={styles.details} data-testid="details">
      <Link to={`/?page=${currentPage}`}>
        <div className={styles.shadow} onClick={handleCloseButton} />
      </Link>
      {isLoadingProduct ? (
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
