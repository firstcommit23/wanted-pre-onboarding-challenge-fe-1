import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../main.css';
import Header from '@/components/Header';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Todo App!</title>
      </Head>
      <div className="w-full bg-indigo-100">
        <Header />
        <div className="w-full max-w-screen-md m-auto bg-indigo-100">
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
};
export default App;
