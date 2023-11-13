import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { expect, test, describe, vi, beforeEach, Mock } from 'vitest';
import { Card } from '../components/Pages/MainPage/components/Card/Card';
import { App } from '../components/App/App';
import { IRequestResult } from '../types/types';
import { mockProduct, mockRequestResult } from './mockData';

global.fetch = vi.fn() as Mock;

function createFetchResponse(data: IRequestResult) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('testing Card.tsx', () => {
  beforeEach((): void => {
    cleanup();
    (fetch as Mock).mockReset();
  });

  test('displays that the card component renders the relevant card data', () => {
    const card = render(<Card product={mockProduct} />);
    const title = card.getByText('dress');
    expect(title).toBeInTheDocument();
    const description = card.getByText('for Woman...');
    expect(description).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
    render(<App />);

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });

  test('clicking on a card triggers an additional API call to fetch detailed information', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('iPhone 9')).toBeInTheDocument();
    });
    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    fireEvent.click(card);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
