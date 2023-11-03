import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage/MainPage';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
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
