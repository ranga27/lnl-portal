import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import SideBar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import IntlMessages from '../utils/IntlMessages';
import Onboarding from './onboarding';
import Login from './login';
import { useRouter } from 'next/router';
import { fetchUserProfileDataFromFirestore } from '../../firebase/firestoreService';

export default function Dashboard() {
  const router = useRouter();
  const {
    userData: { userId, userEmail },
    currentUser,
  } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (currentUser == null) {
      router.push('/login');
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

  if (user && user.isOnboarded === false) {
    return <Onboarding />;
  }

  if (!user) {
    return (
      <Login errorText={'Please verify your email before trying to login'} />
    );
  }

  return (
    <SideBar>
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
              className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-1 sm:ml-3'
            >
              <IntlMessages id='dashboard.button_2' />
            </button>
          </div>
        </div>

        <img
          src={'/assets/coming.svg'}
          className='w-4/5 h-4/5 mx-auto text-center'
        />
      </main>
      <Footer />
    </SideBar>
  );
}
