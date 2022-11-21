import {
  ArrowRightIcon,
  ChevronLeftIcon,
  FilterIcon,
  SearchIcon,
} from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import EmptyComponent from '../layout/EmptyComponent';
import { getRoles } from '../../../firebase/firestoreService';
import AllApplicants from './AllApplicants';

const sampleApplicants = [
  {
    firstName: 'Abraham',
    lastName: 'Kolawole',
    email: 'abraham@loopnotluck.com',
    mobileNumber: '0901322',
    gender: 'Male',
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'doe@loopnotluck.com',
    mobileNumber: '0901322',
    gender: 'Male',
  },
  {
    firstName: 'Marta',
    lastName: 'Daniels',
    email: 'marta@loopnotluck.com',
    mobileNumber: '0901322',
    gender: 'Female',
  },
];

export default function ApplicantsList({ companyId }) {
  const [SearchTerms, setSearchTerms] = useState('');
  const [ApplicantData, setApplicant] = useState([]);
  const [SearchResult, setSearchResult] = useState([]);
  const [roles, setRoles] = useState(Array);

  useEffect(() => {
    getRoles(companyId).then((results) => {
      setRoles(results);
    });
  }, [companyId]);

  useEffect(() => {
    if (SearchTerms !== '') {
      setSearchResult(
        roles.filter((x) => {
          return (
            x.firstName.includes(SearchTerms) || x.email.includes(SearchTerms)
          );
        })
      );
    } else {
      setSearchResult([]);
    }
  }, [roles, SearchTerms]);

  const handleOpenApplicant = (data) => {
    const mergedArray = { ...data, sampleApplicants: sampleApplicants };
    setApplicant(mergedArray);
  };

  const onChangeSearch = (event) => {
    setSearchTerms(event.currentTarget.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setApplicant(SearchResult[0]);
  };

  return (
    <div className='relative h-screen flex overflow-hidden bg-white'>
      <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
        <div className='flex-1 relative z-0 flex overflow-hidden'>
          <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
            <nav
              className='flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden'
              aria-label='Breadcrumb'
            >
              <a
                href='#'
                className='inline-flex items-center space-x-3 text-sm font-medium text-gray-900'
              >
                <ChevronLeftIcon
                  className='-ml-2 h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
                <span>Applicants</span>
              </a>
            </nav>
            {ApplicantData.length === 0 ? (
              <EmptyComponent
                title='role.empty-title'
                subtitle='role.empty-subtitle'
                buttonText='roles.new'
                buttonRequired={false}
              />
            ) : (
              <AllApplicants Applicants={ApplicantData} />
            )}
          </main>
          <aside className='hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200'>
            <div className='px-6 pt-6 pb-4'>
              <p className='mt-1 text-sm text-gray-600'>
                Search list of applicants
              </p>
              <form className='mt-6 flex space-x-4' onSubmit={handleSearch}>
                <div className='flex-1 min-w-0'>
                  <label htmlFor='search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <SearchIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </div>
                    <input
                      type='text'
                      name='search'
                      value={SearchTerms}
                      onChange={onChangeSearch}
                      id='search'
                      className='py-2 focus:ring-[#F7B919] focus:border-[#F7B919] block w-full border pl-10 sm:text-sm border-solid form-control border-gray-300 rounded-md focus:outline-none'
                      placeholder='Search'
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  className='inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                >
                  <FilterIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span className='sr-only'>Search</span>
                </button>
              </form>
            </div>
            <nav
              className='flex-1 min-h-0 overflow-y-auto'
              aria-label='Applicants'
            >
              {roles.map((role) => (
                <div key={role.id} className='relative'>
                  <div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 text-sm font-medium text-gray-500'></div>
                  <ul
                    role='list'
                    className='relative z-0 divide-y divide-gray-200'
                  >
                    <li key={role.id}>
                      <div
                        onClick={() => handleOpenApplicant(role)}
                        className='px-6 py-5 space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#F7B919]'
                      >
                        <button
                          type='button'
                          onClick={() => handleOpenApplicant(role)}
                          className='focus:outline-none'
                        >
                          <div className='flex justify-between w-full min-w-full '>
                            <p className='text-sm text-gray-900 font-medium truncate'>
                              {role.title}
                            </p>
                          </div>
                        </button>
                        <ArrowRightIcon className='w-5 h-5 float-right' />
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
