import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../Pages/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [{ path: '', element: <MainPage /> }],
  },
]);
