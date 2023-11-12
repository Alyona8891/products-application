import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Card } from '../components/Pages/MainPage/components/Card/Card';
import { App } from '../components/App/App';

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

test('clicking on a card opens a detailed card component', async () => {
  render(<App />);
  const cards = await screen.findAllByTestId('card');
  const card = cards[0];
  expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  fireEvent.click(card);
  await screen.findByTestId('details');
  expect(screen.getByTestId('details')).toBeInTheDocument();
});
