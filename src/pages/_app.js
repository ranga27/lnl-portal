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
              <link
                rel='stylesheet'
                href='https://use.fontawesome.com/releases/v5.13.0/css/all.css'
              />
              {/* // TODO: Below stylesheet is used for react-form-builder2 which is conflicting with current designs. Need to fix this! */}
              <link
                rel='stylesheet'
                href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css'
                integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh'
                crossOrigin='anonymous'
              />
            </Head>
            <Component {...pageProps} />
          </IntlProvider>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
