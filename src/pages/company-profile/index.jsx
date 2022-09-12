import { useContext } from 'react';
import Link from 'next/link';
import { formatDateInArray } from '../../utils/commands';
import {
  CalendarIcon,
  ChatAltIcon,
  LockOpenIcon,
  PencilIcon,
} from '@heroicons/react/solid';
import SideBar from '../../components/layout/Sidebar';
import AuthRoute from '../../components/context/authRoute';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { AuthContext } from '../../components/context/AuthContext';
import CompanyAside from '../../components/layout/companyAside';

// Company Internal Information: Contains VAT, Roles posted, the on-boarding info. update logo. See how many credits they have.
// invite team mates. internal business. and stuff related to loop not luck account,
// basically what candidates want see.
// Update company information. View information / View what candidates see and a modal pops up with the view.
// - Role Permissions: Select a particular person to be a role adder / poster or hiring managers.
// - Users: Table -> Add more users, selects how many they want, they do not need to pay immediately, it gets added to their next monthly bill.

//Form Values: Onboarding form info, VAT free text box,  update logo,
//In the dashboard, see NO of roles posteD: 0

export default function CompanyProfile() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const { isLoading, data: company } = useFirestoreQuery(
    ['companyV2'],
    query(collection(firestore, 'companyV2'), where('userId', '==', userId)),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const companiesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(companiesData);
      },
    }
  );

  if (isLoading) {
    return <div className='loading' />;
  }

  return (
    <AuthRoute>
      <SideBar companyPrivateProfile={true}>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='internal-profile.title' />
              </h1>
            </div>
          </div>
          <div className='py-8 xl:py-10'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3'>
              <div className='xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200'>
                <div>
                  <div>
                    <div className='md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6'>
                      <div>
                        <h1 className='text-2xl font-bold text-gray-900'>
                          {company[0].companyName}
                        </h1>
                        <p className='mt-2 text-sm text-gray-500'>
                          Opened on {company[0].createdAt}
                        </p>
                      </div>
                      <div className='mt-4 flex space-x-3 md:mt-0'>
                        <Link href='/company-profile/edit'>
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
                    <aside className='mt-8 xl:hidden'>
                      <h2 className='sr-only'>Details</h2>
                      <div className='space-y-5'>
                        <div className='flex items-center space-x-2'>
                          <LockOpenIcon
                            className='h-5 w-5 text-green-500'
                            aria-hidden='true'
                          />
                          <span className='text-green-700 text-sm font-medium'>
                            Phone aside
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <ChatAltIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          <span className='text-gray-900 text-sm font-medium'>
                            4 comments
                          </span>
                        </div>
                        <div className='flex items-center space-x-2'>
                          <CalendarIcon
                            className='h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          <span className='text-gray-900 text-sm font-medium'>
                            Created on{' '}
                            <time dateTime='2020-12-02'>Dec 2, 2020</time>
                          </span>
                        </div>
                      </div>
                      <div className='mt-6 border-t border-b border-gray-200 py-6 space-y-8'>
                        <div>
                          <h2 className='text-sm font-medium text-gray-500'>
                            Assignees
                          </h2>
                          <ul role='list' className='mt-3 space-y-3'>
                            <li className='flex justify-start'>
                              <a
                                href='#'
                                className='flex items-center space-x-3'
                              >
                                <div className='flex-shrink-0'>
                                  <img
                                    className='h-5 w-5 rounded-full'
                                    src='https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                                    alt=''
                                  />
                                </div>
                                <div className='text-sm font-medium text-gray-900'>
                                  Eduardo Benz
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h2 className='text-sm font-medium text-gray-500'>
                            Tags
                          </h2>
                          <ul role='list' className='mt-2 leading-8'>
                            <li className='inline'>
                              <a
                                href='#'
                                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                              >
                                <div className='absolute flex-shrink-0 flex items-center justify-center'>
                                  <span
                                    className='h-1.5 w-1.5 rounded-full bg-rose-500'
                                    aria-hidden='true'
                                  />
                                </div>
                                <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                  Bug
                                </div>
                              </a>{' '}
                            </li>
                            <li className='inline'>
                              <a
                                href='#'
                                className='relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5'
                              >
                                <div className='absolute flex-shrink-0 flex items-center justify-center'>
                                  <span
                                    className='h-1.5 w-1.5 rounded-full bg-indigo-500'
                                    aria-hidden='true'
                                  />
                                </div>
                                <div className='ml-3.5 text-sm font-medium text-gray-900'>
                                  Accessibility
                                </div>
                              </a>{' '}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </aside>

                    <div className='py-3 xl:pt-6 xl:pb-0 '>
                      <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Location
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {company[0].companyLocation}
                          </dd>
                        </div>
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            ATS
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {company[0].ats}
                          </dd>
                        </div>

                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Industry
                          </dt>
                          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                            {company[0].industry
                              ? company[0].industry.map((item) => (
                                  <li key={item}>{item}</li>
                                ))
                              : null}
                          </dd>
                        </div>

                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Values
                          </dt>
                          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                            {company[0].companyValues
                              ? company[0].companyValues.map((item) => (
                                  <li key={item}>{item}</li>
                                ))
                              : null}
                          </dd>
                        </div>

                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Open to Visa Sponsorship
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {company[0].visa}
                          </dd>
                        </div>
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            LinkedIn
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {company[0].linkedinUrl}
                          </dd>
                        </div>

                        <div className='sm:col-span-2'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Diversity
                          </dt>
                          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                            {company[0].diversity
                              ? company[0].diversity.map((item) => (
                                  <li key={item}>{item}</li>
                                ))
                              : null}
                          </dd>
                        </div>

                        <div className='sm:col-span-2'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Company Description
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900 space-y-5'>
                            {company[0].description}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            <CompanyAside id={company[0].id} img={company[0].logoUrl} updatedAt={company[0].updatedAt}/>
            </div>
          </div>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
