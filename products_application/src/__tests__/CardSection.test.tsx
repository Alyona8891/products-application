import { screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test, describe } from 'vitest';
import { renderWithProviders } from './utils/utils';
import { App } from '../components/App/App';
import { server } from './mockData/handlers';

describe('testing CardSection.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  /*test('displays appropriate message when no cards are present', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/?page=10001']}>
        <CardsSection currentPage={10001} />
      </MemoryRouter>
    );

    const message = screen.getByText(
      'Sorry, nothing found. Please, try again!'
    );
    expect(message).toBeInTheDocument();
  });*/

  test('renders the specified number of cards', async () => {
    renderWithProviders(<App />);

    await screen.findAllByAltText('card image');
    const elementsArr = screen.getAllByAltText('card image');
    expect(elementsArr.length).toEqual(3);
  });
});
