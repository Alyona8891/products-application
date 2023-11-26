import { render } from '@testing-library/react';
import React from 'react';
import { expect, test, describe, beforeAll, afterEach, afterAll } from 'vitest';
import '@testing-library/jest-dom';
import { Card } from '../components/Pages/MainPage/components/Card/Card';
import { mockProduct } from './mockData/mockData';
import { server } from './mockData/handlers';

describe('testing Card.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

  test('displays that the card component renders the relevant card data', () => {
    const card = render(<Card product={mockProduct} />);
    const title = card.getByText('dress');
    expect(title).toBeInTheDocument();
    const description = card.getByText('for Woman...');
    expect(description).toBeInTheDocument();
  });
});
