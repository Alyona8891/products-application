import { router } from '../router/router';
import { RouterProvider } from 'react-router-dom';
import { ProductsProvider } from '../AppContext/AppContext';

export function App(): React.ReactElement {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />;
    </ProductsProvider>
  );
}
