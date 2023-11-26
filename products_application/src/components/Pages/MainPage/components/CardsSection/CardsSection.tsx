import { IProduct, IRequestResult } from '../../../../../types/types';
import { Card } from '../Card/Card';
import styles from './CardsSection.module.scss';

export function CardsSection(props: {
  data: IRequestResult;
  handleQueryChange: (
    search?: string,
    page?: number,
    limit?: number,
    details?: number
  ) => void;
}): React.ReactElement {
  const { data, handleQueryChange } = props;

  return (
    <section className={styles.cards_section}>
      {data.products.length > 0 ? (
        data.products.map((product: IProduct) => {
          return (
            <div
              onClick={(): void =>
                handleQueryChange(undefined, undefined, undefined, product.id)
              }
              key={product.id}
            >
              <Card product={product} />
            </div>
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
