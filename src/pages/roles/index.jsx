import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import SideBar from '../../components/layout/Sidebar';
import IntlMessages from '../../utils/IntlMessages';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { AuthContext } from '../../components/context/AuthContext';
import RolesContainer from '../../components/containers/rolesContainer';
import Footer from '../../components/layout/Footer';
import { getCompany } from '../../../firebase/firestoreService';

export default function Roles() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const [company, setCompany] = useState([]);

  useEffect(() => {
    getCompany(userId).then((results) => {
      setCompany(results);
    });
  }, [userId]);

  return (
    <SideBar>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              <IntlMessages id='roles.title' />
            </h1>
          </div>
          <div className='mt-4 flex sm:mt-0 sm:ml-4'>
            <button
              type='button'
              className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-0 sm:ml-0'
            >
              Share Company Profile
            </button>
            <Link href='/roles/add'>
              <a className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-1 sm:ml-3'>
                <IntlMessages id='roles.create' />
              </a>
            </Link>
          </div>
        </div>
        <div className='px-4 mt-6 sm:px-6 lg:px-8'>
          <h2 className='text-gray-500 text-xs font-medium tracking-wide'>
            <IntlMessages id='roles.subtitle' />
          </h2>
        </div>
        {company.length !== 0 && (
          <RolesContainer companyId={company && company[0]?.id} />
        )}
      </main>
      <Footer />
    </SideBar>
  );
}
