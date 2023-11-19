import { fireEvent, screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test, describe } from 'vitest';
import { App } from '../components/App/App';
import { server } from './mockData/handlers';
import { renderWithProviders } from './utils/utils';

describe('testing SearchBlock.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(<App />);

    const searchInput = await screen.findByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'men' } });
    const searchButton = await screen.findByTestId('searchButton');
    fireEvent.click(searchButton);
    expect(localStorage.getItem('alyona8891_keyword')).to.equal('men');
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    renderWithProviders(<App />);

    const searchInput = await screen.findByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'women' } });
    const searchButton = await screen.findByTestId('searchButton');
    fireEvent.click(searchButton);
    expect(localStorage.getItem('alyona8891_keyword')).to.equal('women');

    renderWithProviders(<App />);
    expect(searchInput).toHaveDisplayValue('women');
  });
});
