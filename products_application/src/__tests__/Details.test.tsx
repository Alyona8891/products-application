import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test, describe } from 'vitest';
import { Details } from '../components/Details/Details';
import { server } from './mockData/handlers';
import { mockProduct, mockRequestResult } from './mockData/mockData';
import { renderWithProviders } from './utils/utils';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import MainPage from '../pages';
import mockRouter from 'next-router-mock';

describe('testing Details.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('detailed card component displays the correct product information', async () => {
    render(<Details data={mockProduct} handleQueryChange={() => {}} />);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    const title = await screen.findByText('dress');
    expect(title).toBeInTheDocument();
    const description = await screen.findByText('for Woman');
    expect(description).toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    renderWithProviders(
      <MemoryRouterProvider>
        <MainPage
          response={{
            data: mockRequestResult,
            error: undefined,
          }}
          details={mockProduct}
          currentCard={1}
          currentPage={1}
          productsOnPage={10}
          keyword={''}
        />
      </MemoryRouterProvider>
    );
    const cards = await screen.findAllByTestId('card');
    const card = cards[1];
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(mockRouter.asPath).contain('details=2');
    const closeButton = screen.getByTestId('closeButton');
    fireEvent.click(closeButton);
    expect(mockRouter.asPath).not.contain('details=2');
  });
});
