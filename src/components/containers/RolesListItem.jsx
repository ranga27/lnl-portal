import { Fragment, useState, useEffect, useContext } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
  ChevronRightIcon,
  DotsVerticalIcon,
  PaperClipIcon,
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from '@heroicons/react/solid';
import Link from 'next/link';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { serverTimestamp, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { getFirstChar } from '../../utils/commands';
import { AuthContext } from '../../components/context/AuthContext';
import DeleteRole from './DeleteRole';
import { fetchUserProfileDataFromFirestore } from '../../../firebase/firestoreService';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function RolesList({ roles }) {
  const [pinned, setPinned] = useState('3a43ocoGT2');
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [pinnedValue, setPinnedValue] = useState(false);
  const [user, setUser] = useState([]);
  const rolesPinned = roles.filter((role) => role.pinned);
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const roleRef = doc(firestore, 'companyRolesV2', pinned);
  const rolesMutation = useFirestoreDocumentMutation(roleRef, {
    merge: true,
  });

  const handlePin = (role) => {
    setPinned(role.id);
    setPinnedValue(role.pinned);
    handleSave(role);
  };

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

  useEffect(() => {
    if (pinned === '3a43ocoGT2') {
      return console.log('Error');
    } else {
      handleSave();
    }
  }, [pinned, pinnedValue]);

  const handleSave = () => {
    if (pinned != '3a43ocoGT2') {
      rolesMutation.mutate(
        { pinned: !pinnedValue, updatedAt: serverTimestamp() },
        {
          onSuccess() {
            console.log('Successful');
          },
        }
      );
    } else {
      return null;
    }
  };

  const handleDeleteRole = (id) => {
    setDeleteStatus(true);
    setDeleteId(id);
  };

  return (
    <main>
      {deleteStatus && <DeleteRole id={deleteId} />}

      <div className='px-4 mt-6 sm:px-6 lg:px-8'>
        <ul
          role='list'
          className='grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3'
        >
          {rolesPinned.map((role) => (
            <li
              key={role.id}
              className='relative col-span-1 flex shadow-sm rounded-md'
            >
              <div className='flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md bg-[#F7B919]'>
                {getFirstChar(role.title)}
              </div>
              <div className='flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate'>
                <div className='flex-1 px-4 py-2 text-sm truncate'>
                  <a
                    href='#'
                    className='text-gray-900 font-medium hover:text-gray-600'
                  >
                    {role.title}
                  </a>
                  <p className='text-gray-500'>{role.department} Department</p>
                </div>
                <Menu as='div' className='flex-shrink-0 pr-2'>
                  <Menu.Button className='w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'>
                    <span className='sr-only'>Open options</span>
                    <DotsVerticalIcon className='w-5 h-5' aria-hidden='true' />
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
                    <Menu.Items className='z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                      <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <Link href={`roles/${role.id}`}>
                              <a
                                className={classNames(
                                  active
                                    ? 'bg-gray-100 text-gray-900 '
                                    : 'text-gray-700 hover:bg-gray-100',
                                  'group flex items-center px-6 py-2 text-sm'
                                )}
                              >
                                View role
                              </a>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                      <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => handlePin(role)}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900 hover:bg-gray-100'
                                  : 'text-gray-700',
                                'block py-2 text-sm min-w-full'
                              )}
                            >
                              Removed from pinned
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-6 py-2 text-sm'
                              )}
                            >
                              Share
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* FOR MOBILE VIEW */}
      <div className='mt-10 sm:hidden'>
        <div className='px-4 sm:px-6'>
          <h2 className='text-gray-500 text-xs font-medium tracking-wide'>
            Roles
          </h2>
        </div>
        <ul
          role='list'
          className='mt-3 border-t border-gray-200 divide-y divide-gray-100'
        >
          {roles.map((role) => (
            <li key={role.id}>
              <Link href={`roles/${role.id}`}>
                <a className='group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6'>
                  <span className='flex items-center truncate space-x-3'>
                    <span
                      className='w-2.5 h-2.5 flex-shrink-0 rounded-full bg-[#F7B919]'
                      aria-hidden='true'
                    />
                    <span className='font-medium truncate text-sm leading-6'>
                      {role.title}{' '}
                      <span className='truncate font-normal text-gray-500'>
                        in {role.department} department
                      </span>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className='ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Projects table (small breakpoint and up) */}
      <div className='hidden mt-8 sm:block'>
        <div className='align-middle inline-block min-w-full border-b border-gray-200'>
          <table className='min-w-full'>
            <thead>
              <tr className='border-t border-gray-200'>
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500  tracking-wider'>
                  <span className='lg:pl-2'>Roles</span>
                </th>
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500  tracking-wider'>
                  Location
                </th>
                <th className='px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500  tracking-wider'>
                  Start Date
                </th>
                <th className='hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500  tracking-wider'>
                  Last updated
                </th>
                <th className='pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500  tracking-wider' />
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td className='px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900'>
                    <div className='flex items-center space-x-3 lg:pl-2'>
                      <div
                        className='flex-shrink-0 w-2.5 h-2.5 rounded-full bg-[#F7B919]'
                        aria-hidden='true'
                      />
                      <Link href={`roles/${role.id}`}>
                        <a className='truncate hover:text-gray-600'>
                          <span>
                            {role.title}{' '}
                            <span className='text-gray-500 font-normal'>
                              in {role.department} department
                            </span>
                          </span>
                        </a>
                      </Link>
                    </div>
                  </td>
                  <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right'>
                    {role.location}
                  </td>
                  <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right'>
                    {role.startDate}
                  </td>
                  <td className='hidden md:table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right'>
                    {role.updatedAt}
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
                            {user.role === 'super' && (
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    href={{
                                      pathname: '/roles/add',
                                      query: {
                                        ...role,
                                        startDate: role.startDate || null,
                                        deadline: role.deadline || null,
                                      },
                                    }}
                                  >
                                    <a
                                      className={classNames(
                                        active
                                          ? 'bg-gray-100 text-gray-900 '
                                          : 'text-gray-700 hover:bg-gray-100',
                                        'group flex items-center px-4 py-2 text-sm'
                                      )}
                                    >
                                      <PencilAltIcon
                                        className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                        aria-hidden='true'
                                      />
                                      Edit
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            )}
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handlePin(role)}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900 w-full'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm'
                                  )}
                                >
                                  <PaperClipIcon
                                    className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                    aria-hidden='true'
                                  />
                                  Pin
                                </button>
                              )}
                            </Menu.Item>
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
                                  <UserAddIcon
                                    className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                    aria-hidden='true'
                                  />
                                  Share
                                </a>
                              )}
                            </Menu.Item>
                          </div>
                          <div className='py-1'>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleDeleteRole(role.id)}
                                  className={classNames(
                                    active
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-700',
                                    'group flex items-center px-4 py-2 text-sm w-full'
                                  )}
                                >
                                  <TrashIcon
                                    className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                    aria-hidden='true'
                                  />
                                  Delete
                                </button>
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
    </main>
  );
}
