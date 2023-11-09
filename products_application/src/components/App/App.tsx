import { router } from '../router/router';
import { RouterProvider } from 'react-router-dom';

export function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}
