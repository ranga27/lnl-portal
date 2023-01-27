import { Fragment, useState, useEffect } from 'react';
import EmptyComponent from '../layout/EmptyComponent';
import RolesListItem from './RolesListItem';
import { getRoles } from '../../../firebase/firestoreService';
import Link from 'next/link';
import IntlMessages from '../../utils/IntlMessages';
import Footer from '../../components/layout/Footer';

export default function RolesContainer({ companyId, roleCredits }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles(companyId).then((results) => {
      setRoles(results);
    });
  }, [companyId]);

  return (
    <Fragment>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              <IntlMessages id='roles.title' />
            </h1>
          </div>
          {roleCredits === 0 ? (
            <p>Role limit Reached</p>
          ) : (
            <div className='mt-4 flex sm:mt-0 sm:ml-4'>
              <Link href='/roles/add'>
                <a className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-1 sm:ml-3'>
                  <IntlMessages id='roles.create' />
                </a>
              </Link>
            </div>
          )}
        </div>
        <div className='px-4 mt-6 sm:px-6 lg:px-8'>
          <h2 className='text-gray-500 text-xs font-medium tracking-wide'>
            <IntlMessages id='roles.subtitle' />
          </h2>
        </div>
        {roles.length === 0 ? (
          <EmptyComponent
            title='roles.empty-title'
            subtitle='roles.empty-subtitle'
            buttonText='roles.new'
            buttonRequired={true}
          />
        ) : (
          <RolesListItem roles={roles} />
        )}
      </main>
      <Footer />
    </Fragment>
  );
}
