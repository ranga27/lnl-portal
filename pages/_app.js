import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

// import { useAuthUser } from '@react-query-firebase/auth';
import AppLocale from '../components/lang';
// import { auth } from '../helpers/Firebase';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const currentAppLocale = AppLocale.en;

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className='loading' />}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <Component {...pageProps} />
        </IntlProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default MyApp;
