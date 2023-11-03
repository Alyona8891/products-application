import { IProduct } from '../../../../types/types';
import { Pagination } from '../../../Pagination/Pagination';
import { Card } from './Card/Card';
import styles from './CardsSection.module.scss';

export function CardsSection(props: {
  products: IProduct[];
  productCount: number;
  productsOnPage: number;
  currentPage: number;
  onClick: (currentPage: number) => void;
}): React.ReactElement {
  const { products, productCount, productsOnPage, currentPage, onClick } =
    props;
  return (
    <section className={styles.cards_section}>
      <Pagination
        currentPage={currentPage}
        productCount={productCount}
        productsOnPage={productsOnPage}
        onClick={onClick}
      />
      <div className={styles.cards_container}>
        {products.length > 0 ? (
          products.map((product: IProduct) => {
            return <Card product={product} key={product.id} />;
          })
        ) : (
          <p className={styles.message}>
            Sorry, nothing found. Please, try again!
          </p>
        )}
      </div>
    </section>
  );
}
