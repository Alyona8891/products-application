import styles from './Details.module.scss';
import { IProduct } from '../../types/types';
//import { useState } from 'react';
import Link from 'next/link';

export function Details(props: { data: IProduct }): React.ReactElement {
  const { data } = props;

  //const [openedProduct, setOpenedProduct] = useState<IProduct | null>(null);
  //const currentCard = Number(queryParameters.get('details')) || 0;
  const handleCloseButton = (): void => {
    //navigate({ search: queryParameters.toString() });
    //setOpenedProduct(null);
  };
  const currentPage = 1;

  /*useEffect(() => {
    if (currentCard > 0) {
      if (data) {
        setOpenedProduct({ ...data });
      }
    }
  }, [currentCard, data]);*/

  return (
    <section className={styles.details} data-testid="details">
      <Link href={`/?page=${currentPage}`}>
        <div className={styles.shadow} onClick={handleCloseButton} />
      </Link>
      {data?.title ? (
        <div className={styles.container}>
          <Link
            href={`/?page=${currentPage}`}
            className={styles.close_button}
            data-testid="closeButton"
          >
            +
          </Link>
          <img
            className={styles.image}
            src={data.images[0]}
            alt="detail image"
          />
          <h3 className={styles.title}>{data.title}</h3>
          <p className={styles.text}>{data.description}</p>
        </div>
      ) : (
        <div className={styles.container}>
          <Link
            href={`/?page=${currentPage}`}
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
