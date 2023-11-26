import type { AppProps } from 'next/app';
import { wrapper } from '../components/store/store';
import { Provider } from 'react-redux';
import './globals.scss';
import Head from 'next/head';

export default function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Head>
        <title>Products Application</title>
      </Head>
      <Component {...props.pageProps} />
    </Provider>
  );
}
