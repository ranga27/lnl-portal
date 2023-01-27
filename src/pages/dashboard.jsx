import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../components/context/AuthContext';
import SideBar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import IntlMessages from '../utils/IntlMessages';
import Onboarding from './onboarding';
import { fetchUserProfileDataFromFirestore } from '../../firebase/firestoreService';
import DashboardContainer from '../components/containers/DashboardContainer';
import Link from 'next/link';

export default function Dashboard() {
  const {
    userData: { userId },
  } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

  if (user && user.isOnboarded === false) {
    return <Onboarding />;
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
            <Link href='/company-profile'>
              <a className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-0 sm:ml-0'>
                <IntlMessages id='dashboard.button_1' />
              </a>
            </Link>
            <Link href='/roles'>
              <a className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-1 sm:ml-3'>
                <IntlMessages id='dashboard.button_2' />
              </a>
            </Link>
          </div>
        </div>
        {user && user.isOnboarded === true ? (
          <DashboardContainer user={user} />
        ) : null}
      </main>
      <Footer />
    </SideBar>
  );
}
