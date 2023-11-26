import { render, waitFor, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import NotFoundPage from '../pages/404';

test('displays 404 page when navigating to an invalid route', async () => {
  render(<NotFoundPage />);
  await waitFor(() =>
    screen.getByText('Something went wrong. Please, try later!')
  );
  expect(screen.getByText('Something went wrong. Please, try later!'))
    .toBeInTheDocument;
});
