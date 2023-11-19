import { fireEvent, screen } from '@testing-library/react';
import {
  beforeAll,
  afterEach,
  afterAll,
  expect,
  test,
  describe,
  Mock,
  vi,
} from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Details } from '../components/Details/Details';
import { App } from '../components/App/App';
import { server } from './mockData/handlers';
import { renderWithProviders } from './utils/utils';

global.fetch = vi.fn() as Mock;

describe('testing Details.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('displays a loading indicator is displayed while fetching data', async () => {
    renderWithProviders(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await screen.findByText('Loading');
    const elements = screen.getByText('Loading');
    expect(elements).toBeInTheDocument();
  });

  test('detailed card component displays the correct product information', async () => {
    renderWithProviders(<App />);

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    const title = await screen.findByText('dress');
    expect(title).toBeInTheDocument();
    const description = await screen.findByText('for Woman');
    expect(description).toBeInTheDocument();
  });

  test('clicking the close button hides the component', async () => {
    renderWithProviders(<App />);

    const cards = await screen.findAllByTestId('card');
    const card = cards[0];
    fireEvent.click(card);
    await screen.findByTestId('details');
    expect(screen.getByTestId('details')).toBeInTheDocument();
    const closeButton = screen.getByTestId('closeButton');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('details')).not.toBeInTheDocument();
  });
});
