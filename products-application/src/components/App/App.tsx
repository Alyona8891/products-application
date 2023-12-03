import { router } from '../router/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';

export function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
