import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { MainPage } from '../Pages/MainPage/MainPage';

export default function App(): React.ReactElement {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </ErrorBoundary>
  );
}
