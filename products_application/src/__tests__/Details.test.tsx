import { render, screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test, describe } from 'vitest';
import { Details } from '../components/Details/Details';
import { server } from './mockData/handlers';
import { mockProduct } from './mockData/mockData';

describe('testing Details.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('detailed card component displays the correct product information', async () => {
    render(<Details data={mockProduct} handleQueryChange={() => {}} />);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    const title = await screen.findByText('dress');
    expect(title).toBeInTheDocument();
    const description = await screen.findByText('for Woman');
    expect(description).toBeInTheDocument();
  });
});
