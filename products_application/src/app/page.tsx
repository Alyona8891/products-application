'use client';

import dynamic from 'next/dynamic';
import './index.scss';

const App = dynamic(() => import('../components/App/App'), { ssr: false });

export default function Page() {
  return <App />;
}
