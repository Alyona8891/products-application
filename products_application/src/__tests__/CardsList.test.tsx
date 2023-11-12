import { render } from '@testing-library/react';
import { AppContext } from '../components/AppContext/AppContext';
import { expect, test } from 'vitest';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';

test('displays appropriate message when no cards are present', () => {
  const emptyProducts = { products: [], total: 0 };
  const cardsSection = render(<CardsSection currentPage={1} />, {
    wrapper: (props) => (
      <AppContext.Provider
        value={{
          productsData: emptyProducts,
          isLoadingProducts: false,
          isLoadingPagination: false,
          getProductsData: () => {},
          setIsLoadingProducts: () => {},
          inputValue: '',
          setInputValue: () => {},
          quantityProductsOnPage: 10,
          setProductsOnPage: () => {},
        }}
      >
        {props.children}
      </AppContext.Provider>
    ),
  });

  const message = cardsSection.getByText(
    'Sorry, nothing found. Please, try again!'
  );
  expect(message).toBeInTheDocument();
});
