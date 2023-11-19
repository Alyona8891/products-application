import { fireEvent, screen } from '@testing-library/react';
import { beforeAll, afterEach, afterAll, expect, test } from 'vitest';
import { App } from '../components/App/App';
import { renderWithProviders } from './utils/utils';
import { server } from './mockData/handlers';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('the component updates URL query parameter when page changes', async () => {
  renderWithProviders(<App />);

  const nextPage = await screen.findByTestId('nextPage');
  fireEvent.click(nextPage);
  expect(location.search).to.equal('?page=2');

  const prevPage = await screen.findByTestId('prevPage');
  fireEvent.click(prevPage);
  expect(location.search).to.equal('?page=1');
});
