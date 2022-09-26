import { useContext } from 'react';
import Link from 'next/link';
import { PencilIcon, StarIcon } from '@heroicons/react/solid';
import SideBar from '../../components/layout/Sidebar';
import AuthRoute from '../../components/context/authRoute';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';
import { AuthContext } from '../../components/context/AuthContext';
import useCollection from '../../components/hooks/useCollection';

export default function ExternalProfile() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const { isLoading, data: company } = useCollection('companyV2', [
    'userId',
    '==',
    userId,
  ]);

  if (isLoading) {
    return <div className='loading' />;
  }

  return (
    <AuthRoute>
      <SideBar>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='external-profile.title' />
              </h1>
            </div>
          </div>
          <div className='py-8 xl:py-10'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='md:flex md:items-center md:justify-between md:space-x-4 border-b xl:pb-6'>
                <div className='flex items-center'>
                  <img
                    className='w-20 h-20 rounded-full mx-auto mr-2'
                    src={company[0].logoUrl}
                    alt='Company logo'
                  />
                  <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                      {company[0].companyName}
                    </h1>
                    <dt className='text-sm font-medium text-gray-500'>
                      {company[0].tagline}
                    </dt>
                    <div className='mt-2 flex'>
                      <a
                        className='text-sm font-medium text-gray-500 flex items-center cursor-pointer'
                        href={company[0].websiteUrl}
                      >
                        <dd className='text-sm text-gray-900'>
                          {company[0].websiteUrl}
                        </dd>
                      </a>
                    </div>
                  </div>
                </div>

                <div className='mt-4 flex space-x-3 md:mt-0'>
                  <Link
                    href={{
                      pathname: '/external-profile/edit',
                      query: {
                        ...company[0],
                      },
                    }}
                  >
                    <a className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919] sm:order-0 sm:ml-0'>
                      <PencilIcon
                        className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                      <span>Edit</span>
                    </a>
                  </Link>
                </div>
              </div>

              <div className='text-center border-b border-gray-200 py-4 flex items-center justify-center'>
                {company[0].industry.map((item) => (
                  <dt
                    key={item}
                    className='text-sm font-medium text-gray-500 mb-2 mr-4'
                  >
                    {item}
                  </dt>
                ))}
              </div>

              <div className='text-center border-b border-gray-200 py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  HIGHLIGHTS
                </dt>
                <dd className='text-sm font-medium bg-slate-100 rounded-md p-1 flex align-middle justify-center'>
                  <StarIcon
                    className='mr-2 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  Glassdoor 4.7
                </dd>
              </div>

              <div className='text-center border-b border-gray-200 py-4'>
                <dt className='text-sm font-medium text-gray-500 mb-2'>
                  COMPANY MISSION
                </dt>
                <dd className='text-sm font-mediu'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
                  fugiat, delectus accusamus adipisci, maiores similique odit
                  dignissimos autem ab, asperiores sit? Fugit odio, tempora
                  incidunt praesentium ratione corporis! Pariatur, cum.
                </dd>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
