import type { AppProps } from 'next/app';
import { wrapper } from '../components/store/store';
import { Provider } from 'react-redux';
import './globals.scss';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}
