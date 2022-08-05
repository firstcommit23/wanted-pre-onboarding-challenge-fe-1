import type { AppProps } from 'next/app';
import Head from 'next/head';
import Header from '@/components/Header';
import '../main.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Todo App!</title>
      </Head>
      <div className="w-full y-full my-auto bg-indigo-100/30">
        <Header />
        <div className=" my-auto">
          <div className="max-w-screen-md">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
