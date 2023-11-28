import { screen, fireEvent } from '@testing-library/react';
import {
  vi,
  beforeAll,
  afterEach,
  afterAll,
  expect,
  test,
  describe,
} from 'vitest';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { server } from './mockData/handlers';
import { renderWithProviders } from './utils/utils';
import MainPage from '../pages';
import { mockProduct, mockRequestResult } from './mockData/mockData';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('testing SearchBlock.tsx', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('clicking the Search button change query parameters', async () => {
    mockRouter.push('/');
    renderWithProviders(
      <MemoryRouterProvider>
        <MainPage
          response={{
            data: mockRequestResult,
            error: undefined,
          }}
          details={mockProduct}
          currentCard={1}
          currentPage={1}
          productsOnPage={10}
          keyword={''}
        />
      </MemoryRouterProvider>
    );

    const searchInput = await screen.findByTestId('searchInput');
    expect(searchInput).toBeInTheDocument();
    expect(mockRouter.asPath).not.contain('search=wwwwww');
    fireEvent.change(searchInput, { target: { value: 'wwwwww' } });
    const searchButton = await screen.findByTestId('searchButton');
    fireEvent.click(searchButton);
    expect(mockRouter.asPath).contain('search=wwwwww');
  });
});
