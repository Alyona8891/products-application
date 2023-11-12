import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Card } from '../components/Pages/MainPage/components/Card/Card';

test('displays that the card component renders the relevant card data', () => {
  const product = {
    id: 1,
    title: 'dress',
    text: 'for Woman',
    images: ['for Woman'],
    description: 'for Woman',
  };

  const card = render(<Card product={product} />);
  const message = card.getByText('dress');
  expect(message).toBeInTheDocument();
});

/* test('clicking on a card opens a detailed card component', () => {
  const product = {
    id: 1,
    title: 'dress',
    text: 'for Woman',
    images: ['for Woman'],
    description: 'for Woman',
  };

  const card = render(
    <MemoryRouter initialEntries={['/']}>
      <Card product={product} />
    </MemoryRouter>
  );

  const cardElement = card.getByText('dress');
  fireEvent.click(cardElement);

  const detailedCardElement = card.getByText('detailes');
  expect(detailedCardElement).toBeInTheDocument();
}); */
