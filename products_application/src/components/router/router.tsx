import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage/MainPage';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage';
import { Details } from '../Details/Details';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary>
            <MainPage />
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'details/*',
            element: (
              <ErrorBoundary>
                <Details />
              </ErrorBoundary>
            ),
          },
        ],
      },
    ],
  },
]);
