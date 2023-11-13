import { cleanup, render, screen } from '@testing-library/react';
import { AppContext } from '../components/AppContext/AppContext';
import { beforeEach, expect, test, describe } from 'vitest';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';
import { MemoryRouter } from 'react-router-dom';
import { mockContext, mockEmptyContext } from './mockData/mockData';

describe('testing CardSection.tsx', () => {
  beforeEach((): void => {
    cleanup();
  });
  test('displays appropriate message when no cards are present', () => {
    const cardsSection = render(<CardsSection currentPage={1} />, {
      wrapper: (props) => (
        <AppContext.Provider value={mockEmptyContext}>
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
});
