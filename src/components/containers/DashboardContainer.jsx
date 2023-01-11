import React from 'react';
import Link from 'next/link';
import { dashboardJoyRide } from '../data/JoyrideConstants';
import {
  BriefcaseIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
  ChartSquareBarIcon,
} from '@heroicons/react/outline';
import Avatar from 'react-avatar';
import ProductTour from '../ProductTour';
// import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const roles = [
  {
    title: 'HR Executive',
    department: 'Human Resources',
    createdAt: '12 Jun 2022',
  },
  {
    title: 'Software Engineer',
    department: 'Engineering',
    createdAt: '22 Jun 2022',
  },
  { title: 'Sales Manager', department: 'Sales', createdAt: '26 April 2022' },
  { title: 'Intern', department: 'Marketing', createdAt: '31 May 2022' },
  { title: 'Intern', department: 'Operations', createdAt: '2 Sept 2022' },
  { title: 'Intern', department: 'Marketing', createdAt: '11 Jan 2022' },
];

const metrics = [
  {
    title: 'Number of Roles Saved by Candidates',
    department: '43',
  },
  {
    title: 'Number of closed roles',
    department: '3',
  },
  {
    title: 'Number of active roles',
    department: '10',
  },
  {
    title: 'Number of Applied Candidates',
    department: '103',
  },
  {
    title: 'Number of Roles added',
    department: '12',
  },
  {
    title: 'Number of Hiring Managers',
    department: '4',
  },
];

const recentHires = [
  {
    name: 'Leonard Krasner',
    email: 'leonardkrasner@gmail.com',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Floyd Miles',
    email: 'floydmiles@gmail.com',
    imageUrl:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Emily Selman',
    email: 'emilyselman@gmail.com',
    imageUrl:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
  {
    name: 'Kristin Watson',
    email: 'kristinwatson@gmail.com',
    imageUrl:
      'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
  },
];

const DashboardContainer = () => {
  return (
    <div className='container mt-6 mx-auto px-4 md:px-12'>
      <ProductTour JoyRideCustomConstant={dashboardJoyRide} />
      <div className='flex flex-wrap -mx-1 lg:-mx-4'>
        <div
          className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
          id='number-of-roles-box'
        >
          <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200'>
            <div className='flex justify-between'>
              <h2 className='text-lg font-semibold mb-2 text-gray-800'>
                No of Roles
              </h2>
              <div className='flex justify-around '>
                <BriefcaseIcon className='w-12 h-12 text-gray-700' />
              </div>
            </div>
            <h2 className='text-xl font-bold mb-2 text-gray-800'>11</h2>
            <div className='text-left'>
              <Link href='/roles/add' passHref>
                <a className='text-black hover:text-[#F7B919]'>
                  Add a new role
                </a>
              </Link>
            </div>
          </div>
        </div>{' '}
        <div
          className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
          id='num-of-total-applicant'
        >
          <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200'>
            <div className='flex justify-between'>
              <h2 className='text-lg font-semibold mb-2 text-gray-800'>
                No of Applicants
              </h2>
              <div className='flex justify-around '>
                <UserGroupIcon className='w-12 h-12 text-gray-700' />
              </div>
            </div>
            <h2 className='text-xl font-bold mb-2 text-gray-800'>9</h2>
            <div className='text-left'>
              <Link href='/applicants' passHref>
                <a className='text-black hover:text-[#F7B919]'>
                  View applicants
                </a>
              </Link>
            </div>
          </div>
        </div>{' '}
        <div
          className='my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3'
          id='number-of-account-user'
        >
          <div className='bg-white p-6 rounded-lg shadow-lg border border-gray-300 hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200'>
            <div className='flex justify-between'>
              <h2 className='text-lg font-semibold mb-2 text-Hgray-800'>
                No of Users
              </h2>
              <div className='flex justify-around '>
                <OfficeBuildingIcon className='w-12 h-12 text-gray-700' />
              </div>
            </div>
            <h2 className='text-xl font-bold mb-2 text-gray-800'>3</h2>
            <div className='text-left'>
              <Link href='/settings' passHref>
                <a className='text-black hover:text-[#F7B919]'>
                  Add a new user
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className=''>
        <div className='flex flex-wrap h-full'>
          <div
            className='w-full mr-1 lg:my-4 lg:w-2xl md:max-w-2xl bg-white shadow-lg rounded-lg border border-gray-200'
            id='role-detail-view'
          >
            <header className='px-5 py-4 border-b border-gray-100'>
              <div className='font-semibold text-gray-800'>Roles</div>
            </header>

            <div className='overflow-x-auto p-3'>
              <table className='table-auto w-full'>
                <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                  <tr>
                    <th></th>
                    <th className='p-2'>
                      <div className='font-semibold text-left'>Title</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold text-left'>Department</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold text-left'>Created At</div>
                    </th>
                    <th className='p-2' id='delete-role-button'>
                      <div className='font-semibold text-center'>Delete</div>
                    </th>
                  </tr>
                </thead>

                <tbody className='text-sm divide-y divide-gray-200'>
                  {roles.map((item, index) => (
                    <tr key={index}>
                      <td className='p-2'>
                        <input
                          type='checkbox'
                          className='w-5 h-5'
                          value='id-1'
                        />
                      </td>
                      <td className='p-2'>
                        <div className='font-medium text-gray-800'>
                          {item.title}
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left'>{item.department}</div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left font-medium'>
                          {item.createdAt}
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='flex justify-center text-gray-800'>
                          <button>
                            <svg
                              className='w-8 h-8 hover:text-[#F7B919] rounded-full hover:bg-gray-100 p-1'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className=' w-full ml-12 lg:my-4 lg:w-1/3 md:w-1/2 bg-white shadow-lg rounded-lg border border-gray-200'
            id='metrix-details'
          >
            <header className='px-5 py-4 border-b border-gray-100'>
              <div className='font-semibold text-gray-800'>Metrics</div>
            </header>

            <div className='overflow-x-auto p-3'>
              <table className='table-auto w-full'>
                <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                  <tr>
                    <th className='p-2'>
                      <div className='font-semibold text-left'>Section</div>
                    </th>
                    <th className='p-2'>
                      <div className='font-semibold text-left'>Results</div>
                    </th>
                    <th className='p-2'></th>
                  </tr>
                </thead>

                <tbody className='text-sm divide-y divide-gray-200'>
                  {metrics.map((item, index) => (
                    <tr key={index}>
                      <td className='p-2'>
                        <div className='font-medium text-gray-800'>
                          {item.title}
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left'>{item.department}</div>
                      </td>

                      <td className='p-2'>
                        <div className='flex justify-center text-gray-800'>
                          <ChartSquareBarIcon className='w-8 h-8 hover:bg-gray-100 rounded-full h p-1' />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby='recent-applicants-title' className='mb-12'>
        <div
          className='my-4 rounded-lg bg-white overflow-hidden shadow-lg border border-gray-200'
          id='recent-appicant'
        >
          <div className=''>
            <header className='px-5 py-4 border-b border-gray-100'>
              <div className='font-semibold text-gray-800'>
                {' '}
                Recent Applicants
              </div>
            </header>
            <div className='p-6 flow-root mt-6'>
              <ul role='list' className='-my-5 divide-y divide-gray-200'>
                {recentHires.map((candidate) => (
                  <li key={candidate.email} className='py-4'>
                    <div className='flex items-center space-x-4'>
                      <div className='flex-shrink-0'>
                        <Avatar
                          name={candidate.name}
                          size='45px'
                          className='rounded-full flex-shrink-0'
                          color='#26ADB4'
                        />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-gray-900 truncate'>
                          {candidate.name}
                        </p>
                        <p className='text-sm text-gray-500 truncate'>
                          {candidate.email}
                        </p>
                      </div>
                      <div>
                        <Link href={candidate.href}>
                          <a className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'>
                            View
                          </a>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='p-6'>
              <a
                href='#'
                className='w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              >
                View all
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DashboardContainer;
