import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { expect, test, describe, beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';
import { Card } from '../components/Pages/MainPage/components/Card/Card';
import { mockProduct, mockRequestResult } from './mockData/mockData';
import { server } from './mockData/handlers';
import { renderWithProviders } from './utils/utils';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import MainPage from '../pages';

describe('testing Card.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('displays that the card component renders the relevant card data', () => {
    const card = render(<Card product={mockProduct} />);
    const title = card.getByText('dress');
    expect(title).toBeInTheDocument();
    const description = card.getByText('for Woman...');
    expect(description).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
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
    const card = cards[0];
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
