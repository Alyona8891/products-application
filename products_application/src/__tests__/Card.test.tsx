import { render, screen, fireEvent, act } from '@testing-library/react';
import { expect, test, describe } from 'vitest';
import { Card } from '../components/Pages/MainPage/components/Card/Card';
import { App } from '../components/App/App';

function setTestingTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('testing Card.tsx', () => {
  test('displays that the card component renders the relevant card data', () => {
    const product = {
      id: 1,
      title: 'dress',
      text: 'for Woman',
      images: ['for Woman'],
      description: 'for Woman',
    };

    const card = render(<Card product={product} />);
    const title = card.getByText('dress');
    expect(title).toBeInTheDocument();
    const description = card.getByText('for Woman...');
    expect(description).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    act(() => {
      render(<App />);
    });
    await act(() => setTestingTimeout(700));
    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    await act(() => setTestingTimeout(700));
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
});
