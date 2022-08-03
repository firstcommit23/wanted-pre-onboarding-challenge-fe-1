import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/components/Header';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Todo App!</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};
export default App;
