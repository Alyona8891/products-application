import { render, waitFor, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { MainPage } from '../pages';
import { NotFoundPage } from '../components/Pages/NotFoundPage/NotFoundPage';

test('displays 404 page when navigating to an invalid route', async () => {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        errorElement: <NotFoundPage />,
        children: [
          {
            path: '',
            element: <MainPage />,
          },
        ],
      },
    ],
    {
      initialEntries: ['sojvoeoojevjoe'],
      initialIndex: 1,
    }
  );
  render(<RouterProvider router={router} />);
  await waitFor(() =>
    screen.getByText('Something went wrong. Please, try later!')
  );
  expect(screen.getByText('Something went wrong. Please, try later!'))
    .toBeInTheDocument;
});
