import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, Mock, vi } from 'vitest';
import { mockRequestResult } from './mockData';
import { IProduct, IRequestResult } from '../types/types';
import { App } from '../components/App/App';

global.fetch = vi.fn() as Mock;

function createFetchResponse(data: IRequestResult | IProduct) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

test('the component updates URL query parameter when page changes', async () => {
  (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
  render(<App />);

  const nextPage = await screen.findByTestId('nextPage');
  fireEvent.click(nextPage);
  expect(location.search).to.equal('?page=2');

  const prevPage = await screen.findByTestId('prevPage');
  fireEvent.click(prevPage);
  expect(location.search).to.equal('?page=1');
});
