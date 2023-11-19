import { screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test, describe } from 'vitest';
import { renderWithProviders } from './utils/utils';
import { App } from '../components/App/App';
import { server } from './mockData/handlers';
import { mockEmptyProductsData } from './mockData/mockData';
import { MemoryRouter } from 'react-router-dom';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';

describe('testing CardSection.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('displays appropriate message when no cards are present', () => {
    renderWithProviders(
      <MemoryRouter>
        <CardsSection currentPage={1} data={mockEmptyProductsData} />
      </MemoryRouter>
    );

    const message = screen.getByText(
      'Sorry, nothing found. Please, try again!'
    );
    expect(message).toBeInTheDocument();
  });

  test('renders the specified number of cards', async () => {
    renderWithProviders(<App />);

    await screen.findAllByAltText('card image');
    const elementsArr = screen.getAllByAltText('card image');
    expect(elementsArr.length).toEqual(3);
  });
});
