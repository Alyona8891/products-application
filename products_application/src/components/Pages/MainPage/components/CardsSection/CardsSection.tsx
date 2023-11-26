import { IProduct, IRequestResult } from '../../../../../types/types';
import { Card } from '../Card/Card';
import styles from './CardsSection.module.scss';
import Link from 'next/link';

export function CardsSection(props: {
  currentPage: number;
  data: IRequestResult;
}): React.ReactElement {
  const { currentPage, data } = props;

  return (
    <section className={styles.cards_section}>
      {data.products.length > 0 ? (
        data.products.map((product: IProduct) => {
          return (
            <Link
              href={`details/?page=${currentPage}&details=${product.id}`}
              key={product.id}
            >
              <Card product={product} />
            </Link>
          );
        })
      ) : (
        <p className={styles.message}>
          Sorry, nothing found. Please, try again!
        </p>
      )}
    </section>
  );
}
