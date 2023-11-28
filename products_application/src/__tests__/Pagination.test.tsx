import { fireEvent, screen } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import { mockProduct, mockRequestResult } from './mockData/mockData';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import mockRouter from 'next-router-mock';
import MainPage from '../pages';
import React from 'react';
import { renderWithProviders } from './utils/utils';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('testing pagination.tsx', (): void => {
  test('the component updates URL query parameter when page changes', async () => {
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

    const nextPage = await screen.findByTestId('nextPage');
    expect(mockRouter.query.page).to.equal(undefined);
    fireEvent.click(nextPage);
    expect(mockRouter.query.page).to.equal('2');
  });
});
