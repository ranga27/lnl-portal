import { useContext } from 'react';
import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import { AuthContext } from '../components/context/AuthContext';
import SideBar from '../components/layout/Sidebar';
import Router from 'next/router';
import AuthRoute from '../components/context/authRoute';
import Footer from '../components/layout/Footer';
import IntlMessages from '../utils/IntlMessages';

export default function Dashboard() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const collectionRef = collection(firestore, 'users');
  const ref = doc(collectionRef, userId);
  const { isLoading, data: user } = useFirestoreDocumentData(
    ['userDoc'],
    ref,
    {
      subscribe: true,
    },
    {
      onSuccess() {
        console.debug('User Data loaded successfully');
      },
      onError(error) {
        console.error('Woops, something went wrong!', error);
      },
    }
  );
  if (isLoading) {
    return <div className='loading' />;
  }

  if (!user.isOnboarded) return Router.push('onboarding');
  return (
    <AuthRoute>
      <SideBar dashboard={true}>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='dashboard.title' />
              </h1>
            </div>
            <div className='mt-4 flex sm:mt-0 sm:ml-4'>
              <button
                type='button'
                className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-0 sm:ml-0'
              >
                <IntlMessages id='dashboard.button_1' />
              </button>
              <button
                type='button'
                className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-1 sm:ml-3'
              >
                <IntlMessages id='dashboard.button_2' />
              </button>
            </div>
          </div>

          <h1 className='mx-auto text-bold pt-56 text-center text-5xl'>
            Work in Progress
          </h1>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
