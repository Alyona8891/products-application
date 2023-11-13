import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, test, describe, Mock, vi } from 'vitest';
import { mockRequestResult } from './mockData/mockData';
import { App } from '../components/App/App';
import { createFetchResponse } from './utils/utils';

global.fetch = vi.fn() as Mock;

describe('testing SearchBlock.tsx', () => {
  beforeEach((): void => {
    cleanup();
    (fetch as Mock).mockReset();
  });

  test('clicking the Search button saves the entered value to the local storage', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
    render(<App />);

    const searchInput = await screen.findByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'men' } });
    const searchButton = await screen.findByTestId('searchButton');
    fireEvent.click(searchButton);
    expect(localStorage.getItem('alyona8891_keyword')).to.equal('men');
  });

  test('the component retrieves the value from the local storage upon mounting', async () => {
    (fetch as Mock).mockResolvedValue(createFetchResponse(mockRequestResult));
    render(<App />);

    const searchInput = await screen.findByTestId('searchInput');
    fireEvent.change(searchInput, { target: { value: 'women' } });
    const searchButton = await screen.findByTestId('searchButton');
    fireEvent.click(searchButton);
    expect(localStorage.getItem('alyona8891_keyword')).to.equal('women');

    render(<App />);
    expect(searchInput).toHaveDisplayValue('women');
  });
});
