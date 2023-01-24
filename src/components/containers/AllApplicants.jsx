import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import EmptyComponent from '../layout/EmptyComponent';
import Applicant from './Applicant';
import { format } from 'date-fns';
import { fetchUserData } from '../../../firebase/firestoreService';
import Link from 'next/link';

export default function AllApplicants({ Applicants }) {
  const [isOpen, setOpen] = useState(false);
  const [ApplicantData, setApplicant] = useState([]);

  const handleOpenApplicant = (data) => {
    setOpen(true);
    setApplicant(data);
  };

  const [appliedUsers, setAppliedUsers] = useState([]);

  useEffect(() => {
    fetchUserData(Applicants.id).then((results) => {
      setAppliedUsers(results);
    });
  }, [Applicants.id]);

  return (
    <>
      {isOpen ? (
        <main className='py-0 sm:py:6 flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
          <nav
            className='flex items-start px-2 py-3 sm:px-4 lg:px-2'
            aria-label='Breadcrumb'
          >
            <button
              onClick={() => setOpen(!isOpen)}
              type='button'
              className='inline-flex items-center space-x-3 text-sm font-medium text-gray-900'
            >
              <ChevronLeftIcon
                className='-ml-2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <span>Applicants</span>
            </button>
          </nav>
          <Applicant Applicant={ApplicantData} roleData={Applicants} />
        </main>
      ) : (
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-gray-900'>
                Applicants
              </h1>
              <p className='mt-2 text-sm text-gray-700'>
                A list of all the candidates that have applied for this role
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto'
              >
                Refresh
              </button>
            </div>
          </div>

          {appliedUsers.length === 0 ? (
            <div className='mx-auto'>
              <EmptyComponent
                title='applicant.empty-title'
                subtitle='applicant.empty-subtitle'
                buttonText='roles.new'
                buttonRequired={false}
              />
            </div>
          ) : (
            <div className='mt-8 flex flex-col'>
              <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle'>
                  <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5'>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                          >
                            Name
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Percentage Match Score
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Application Date
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Status
                          </th>
                          <th
                            scope='col'
                            className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'
                          >
                            <span className='sr-only'>View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {appliedUsers?.map((data) => (
                          <tr key={data.uid}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                              {data.firstName + ' ' + data.lastName}
                            </td>
                            <td className='text-center whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {data.match}%
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {format(
                                new Date(data.appliedAt.toDate()),
                                'dd-MMM-yyyy'
                              )}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {data.status}
                            </td>
                            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                              <button
                                onClick={() => handleOpenApplicant(data)}
                                type='button'
                                className='text-black hover:text-gray-600'
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
