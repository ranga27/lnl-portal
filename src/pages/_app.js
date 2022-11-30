import { Suspense } from 'react';
import Head from 'next/head';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppLocale from '../components/lang';
import { AuthProvider } from '../components/context/AuthContext';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import 'react-form-builder2/dist/app.css';

function MyApp({ Component, pageProps }) {
  const currentAppLocale = AppLocale.en;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<div className='loading' />}>
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <Head>
              <link rel='icon' href='/assets/black.png' />
            </Head>
            <Component {...pageProps} />
          </IntlProvider>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
