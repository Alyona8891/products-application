import { render, waitFor, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import ErrorPage from '../pages/500';

test('displays 500 page when server error', async () => {
  render(<ErrorPage />);
  await waitFor(() =>
    screen.getByText('Something went wrong with server. Please, try later!')
  );
  expect(
    screen.getByText('Something went wrong with server. Please, try later!')
  ).toBeInTheDocument;
});
