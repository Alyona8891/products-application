import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage/MainPage';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { NotFoundPage } from '../Pages/NotFoundPage/NotFoundPage';

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
      },
    ],
  },
]);
