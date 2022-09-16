import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon, LinkIcon } from '@heroicons/react/solid';
const applicants = [
  {
    id: 1,
    name: 'Lindsay Walton',
    email: 'lindsaywalton@gmail.com',
    location: 'Crystal Palace',
    appliedAt: '23 June 2022',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    location: 'London',
    appliedAt: '23 Dec 2021',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const RoleApplicants = () => {
  return (
    <div>
      <div className='hidden sm:block'>
        <div className='align-middle inline-block min-w-full border-b border-gray-200'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-t border-gray-200'>
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500  tracking-wider'>
                  <span className='lg:pl-2'>Applicants Name</span>
                </th>
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500  tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500  tracking-wider'>
                  Location
                </th>
                <th className='hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500  tracking-wider'>
                  Application date
                </th>
                <th className='pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500  tracking-wider' />
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className='px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900'>
                    <div className='flex items-center space-x-3 lg:pl-2'>
                      <div
                        className='flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#F7B919]'
                        aria-hidden='true'
                      />
                      <p className='truncate hover:text-gray-600'>
                        {applicant.name}{' '}
                      </p>
                    </div>
                  </td>
                  <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-left'>
                    {applicant.email}
                  </td>
                  <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-left'>
                    {applicant.location}
                  </td>
                  <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-left'>
                    {applicant.appliedAt}
                  </td>
                  <td className='pr-6'>
                    <Menu
                      as='div'
                      className='relative flex justify-end items-center'
                    >
                      <Menu.Button className='w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'>
                        <span className='sr-only'>Open options</span>
                        <DotsVerticalIcon
                          className='w-5 h-5'
                          aria-hidden='true'
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                          <div className='py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href='#'
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm'
                                  )}
                                >
                                  <LinkIcon
                                    className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                    aria-hidden='true'
                                  />
                                  View
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoleApplicants;
