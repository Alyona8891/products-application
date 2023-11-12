import { cleanup, render, screen } from '@testing-library/react';
import { AppContext } from '../components/AppContext/AppContext';
import { afterEach, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Details } from '../components/Details/Details';

afterEach(() => cleanup());

test('displays a loading indicator is displayed while fetching data', async () => {
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
        <Details />
      </MemoryRouter>
    </AppContext.Provider>
  );
  await screen.findByText('Loading');
  const elements = screen.getByText('Loading');
  expect(elements).toBeInTheDocument();
});

/*test('detailed card component displays the correct product information', async () => {
  render(<App />);
  await waitFor(() => {
    const card = screen.getAllByTestId('card')[0];
    fireEvent.click(card);
    expect(location.search).toBe('?page=1&details=1');
    const details = screen.findByTestId('details');
    expect(details).toMatchSnapshot();
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});*/
