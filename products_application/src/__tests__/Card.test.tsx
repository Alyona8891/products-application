import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  expect,
  test,
  describe,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from 'vitest';
import { Card } from '../components/Pages/MainPage/components/Card/Card';
import { App } from '../components/App/App';
import { mockProduct } from './mockData/mockData';
import { renderWithProviders } from './utils/utils';
import { server } from './mockData/handlers';
import * as mockedProductApi from '../components/store/utils/api';

describe('testing Card.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('displays that the card component renders the relevant card data', () => {
    const card = render(<Card product={mockProduct} />);
    const title = card.getByText('dress');
    expect(title).toBeInTheDocument();
    const description = card.getByText('for Woman...');
    expect(description).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    renderWithProviders(<App />);

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  test('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.getByText('iPhone 9')).toBeInTheDocument();
    });
    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    const spyOn = vi.spyOn(mockedProductApi, 'useFetchProductQuery');
    fireEvent.click(card);
    await waitFor(() => {
      expect(spyOn).toHaveBeenCalled();
    });
  });
});
