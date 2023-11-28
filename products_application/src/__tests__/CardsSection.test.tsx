import { render, screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test, describe } from 'vitest';
import { server } from './mockData/handlers';
import { mockEmptyProductsData, mockRequestResult } from './mockData/mockData';
import { CardsSection } from '../components/Pages/MainPage/components/CardsSection/CardsSection';

describe('testing CardSection.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('displays appropriate message when no cards are present', () => {
    render(
      <CardsSection data={mockEmptyProductsData} handleQueryChange={() => {}} />
    );

    const message = screen.getByText(
      'Sorry, nothing found. Please, try again!'
    );
    expect(message).toBeInTheDocument();
  });

  test('renders the specified number of cards', async () => {
    render(
      <CardsSection data={mockRequestResult} handleQueryChange={() => {}} />
    );

    await screen.findAllByAltText('card image');
    const elementsArr = screen.getAllByAltText('card image');
    expect(elementsArr.length).toEqual(3);
  });
});
