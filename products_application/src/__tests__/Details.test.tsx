import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AppContext } from '../components/AppContext/AppContext';
import { beforeEach, expect, test, describe, Mock, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Details } from '../components/Details/Details';
import {
  mockContext,
  mockProduct,
  mockRequestResult,
} from './mockData/mockData';
import { App } from '../components/App/App';
import { createFetchResponse } from './utils/utils';

global.fetch = vi.fn() as Mock;

describe('testing Details.tsx', () => {
  beforeEach((): void => {
    cleanup();
    (fetch as Mock).mockReset();
  });

  test('displays a loading indicator is displayed while fetching data', async () => {
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

  test('detailed card component displays the correct product information', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
    render(<App />);

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockProduct));
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    const title = await screen.findByText('dress');
    expect(title).toBeInTheDocument();
    const description = await screen.findByText('for Woman');
    expect(description).toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
    render(<App />);

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockProduct));
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    const closeButton = screen.getByTestId('closeButton');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });
});
