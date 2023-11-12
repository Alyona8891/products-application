import { render, screen } from '@testing-library/react';
import { AppContext } from '../components/AppContext/AppContext';
import { expect, test } from 'vitest';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';
import { MemoryRouter } from 'react-router-dom';

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

test('renders the specified number of cards', async () => {
  const mockContext = {
    productsData: {
      products: [
        {
          id: 1,
          title: 'ijivjri',
          text: 'okcovo',
          images: ['ofo'],
          description: 'okcovo',
        },
        {
          id: 2,
          title: 'efe',
          text: 'efef',
          images: ['efefe'],
          description: 'efefe',
        },
        {
          id: 3,
          title: 'efe',
          text: 'efef',
          images: ['efefe'],
          description: 'efefe',
        },
      ],
      total: 1,
    },
    isLoadingProducts: false,
    isLoadingPagination: false,
    getProductsData: () => {},
    setIsLoadingProducts: () => {},
    inputValue: '',
    setInputValue: () => {},
    quantityProductsOnPage: 10,
    setProductsOnPage: () => {},
  };
  render(
    <AppContext.Provider value={mockContext}>
      <MemoryRouter>
        <CardsSection currentPage={1} />
      </MemoryRouter>
    </AppContext.Provider>
  );
  await screen.findAllByAltText('card image');
  const elementsArr = screen.getAllByAltText('card image');
  expect(elementsArr.length).toEqual(3);
});
