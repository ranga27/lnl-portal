/* eslint-disable @next/next/no-img-element */
import { Fragment, useState, useContext, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  DesktopComputerIcon,
  MenuAlt1Icon,
  BriefcaseIcon,
  XIcon,
  UserGroupIcon,
  LogoutIcon,
  CogIcon,
  ShieldCheckIcon,
  OfficeBuildingIcon,
  CalculatorIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchIcon, SelectorIcon } from '@heroicons/react/solid';
import Avatar from 'react-avatar';
import { AuthContext } from '../context/AuthContext';
import { fetchUserProfileDataFromFirestore } from '../../../firebase/firestoreService';
import RolesList from './RolesList';
import Onboarding from '../../pages/onboarding';
import { lnlLogo } from '../data/constants';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: DesktopComputerIcon,
    current: false,
    id: 'dashboard',
  },
  {
    name: 'Roles',
    href: '/roles',
    icon: BriefcaseIcon,
    current: false,
    id: 'roles',
  },
  {
    name: 'Manage Applicants',
    href: '/applicants',
    icon: UserGroupIcon,
    current: false,
    id: 'manage-applicants',
  },
  {
    name: 'Internal Company Profile',
    href: '/company-profile',
    icon: ShieldCheckIcon,
    current: false,
    id: 'internal-company-profile',
  },
  {
    name: 'External Company Profile',
    href: '/external-profile',
    icon: OfficeBuildingIcon,
    current: false,
    id: 'external-company-profile',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
    current: false,
    id: 'setting',
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SideBar({ children }) {
  const [user, setUser] = useState([]);
  const { pathname } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    userData: { userId },
  } = useContext(AuthContext);

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

  if (user && user.isOnboarded === false) {
    return <Onboarding />;
  }

  const fullName = user.firstName + ' ' + user.lastName;
  return (
    <div className='relative h-screen flex overflow-hidden bg-white'>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 flex z-40 lg:hidden'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 -mr-12 pt-2'>
                  <button
                    type='button'
                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className='sr-only'>Close sidebar</span>
                    <XIcon className='h-6 w-6 text-white' aria-hidden='true' />
                  </button>
                </div>
              </Transition.Child>
              <div className='flex-shrink-0 flex text-center mx-auto items-center px-4'>
                <img className='h-16 w-16' src={lnlLogo} alt='LNL' />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name} passHref>
                        <a
                          className={classNames(
                            item.href === pathname
                              ? 'bg-[#F7B919] text-gray-900 font-semibold'
                              : 'text-white hover:text-gray-900 hover:bg-[#F7B919] font-bold',
                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.href === pathname
                                ? 'text-gray-900'
                                : 'text-white group-hover:text-gray-900',
                              'mr-3 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    {user.role === 'admin' ? (
                      <Link href='/admin' passHref>
                        <a
                          className={classNames(
                            'logout' === pathname
                              ? 'bg-[#F7B919] text-gray-900 font-semibold'
                              : 'text-white hover:text-gray-900 hover:bg-[#F7B919] font-bold',
                            'group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md'
                          )}
                        >
                          <CalculatorIcon
                            className='mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-900 text-white'
                            aria-hidden='true'
                          />
                          Statistics
                        </a>
                      </Link>
                    ) : null}
                  </div>
                  {user.isOnboarded && <RolesList userId={userId} />}
                </nav>
              </div>
              <div className='flex-shrink-0 flex border-t border-gray-400 pt-4 px-3'>
                <Link href='/logout' passHref>
                  <a
                    className={classNames(
                      'logout' === pathname
                        ? 'bg-[#F7B919] text-gray-900 font-semibold'
                        : 'text-white hover:text-gray-900 hover:bg-[#F7B919] font-bold',
                      'group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <LogoutIcon
                      className='mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-900 text-white'
                      aria-hidden='true'
                    />
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'>
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className='hidden lg:flex lg:flex-shrink-0'>
        <div className='flex flex-col w-64 border-r border-gray-200 pt-0 pb-4 bg-gray-800'>
          <div className='flex-shrink-0 flex text-center mx-auto items-center px-4 pt-4'>
            <img className='h-16 w-16' src={lnlLogo} alt='LNL' />
          </div>
          <div className='h-0 flex-1 flex flex-col overflow-y-auto'>
            {/* User account dropdown */}
            <Menu
              as='div'
              className='px-3 mt-2 relative inline-block text-left'
            >
              <div>
                <Menu.Button className='group w-full rounded-md px-3.5 py-2 text-sm text-left font-medium focus:outline-none focus:ring-2 focus:ring-[#F7B919]'>
                  <span className='flex w-full justify-between items-center'>
                    <span className='flex min-w-0 items-center justify-between space-x-3'>
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          className='h-12 w-12 rounded-full'
                          alt={user.firstName + user.lastName}
                        />
                      ) : (
                        <Avatar
                          name={fullName}
                          size='45px'
                          className='rounded-full flex-shrink-0'
                          color='#26ADB4'
                        />
                      )}

                      <span className='flex-1 flex flex-col min-w-0'>
                        <span className='text-white  text-sm font-bold truncate'>
                          {user.firstName} {user.lastName}
                        </span>
                        <span className='text-gray-100 text-sm truncate'>
                          {user.email}
                        </span>
                      </span>
                    </span>
                    <SelectorIcon
                      className='flex-shrink-0 h-5 w-5 text-white group-hover:text-gray-100'
                      aria-hidden='true'
                    />
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/company-profile' passHref>
                          <a
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Company profile
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/settings' passHref>
                          <a
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Settings
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/roles' passHref>
                          <a
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Post Role
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/faq' passHref>
                          <a
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            FAQ
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/terms-and-conditions' passHref>
                          <a
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            T&Cs
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href='/logout' passHref>
                          <a
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Logout
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Navigation */}
            <nav className='px-3 mt-6'>
              <div className='space-y-1'>
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name} passHref>
                    <a
                      key={item.name}
                      className={classNames(
                        item.href === pathname
                          ? 'bg-[#F7B919] text-gray-900 font-semibold'
                          : 'text-white hover:text-gray-900 hover:bg-[#F7B919] font-bold',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.href === pathname
                            ? 'text-gray-900'
                            : 'text-white group-hover:text-gray-900',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
                {user.role === 'admin' ? (
                  <Link href='/admin' passHref>
                    <a
                      className={classNames(
                        'logout' === pathname
                          ? 'bg-[#F7B919] text-gray-900 font-semibold'
                          : 'text-white hover:text-gray-900 hover:bg-[#F7B919] font-bold',
                        'group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                    >
                      <CalculatorIcon
                        className='mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-900 text-white'
                        aria-hidden='true'
                      />
                      Statistics
                    </a>
                  </Link>
                ) : null}
              </div>
              <RolesList userId={userId} />
            </nav>
          </div>
          <div className='flex-shrink-0 flex border-t border-gray-400 pt-4 px-3'>
            <Link href='/logout' passHref>
              <a
                className={classNames(
                  'logout' === pathname
                    ? 'bg-[#F7B919] text-gray-900 font-semibold'
                    : 'text-white hover:text-gray-900 hover:bg-[#F7B919] font-bold',
                  'group w-full flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
              >
                <LogoutIcon
                  className='mr-3 flex-shrink-0 h-6 w-6 group-hover:text-gray-900 text-white'
                  aria-hidden='true'
                />
                Logout
              </a>
            </Link>
          </div>
        </div>
      </div>
      {/* Main column */}
      <div className='flex flex-col w-0 flex-1 overflow-hidden'>
        {/* Search header */}
        <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden'>
          <button
            type='button'
            className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F7B919] lg:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='sr-only'>Open sidebar</span>
            <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
          </button>
          <div className='flex-1 flex justify-between px-4 sm:px-6 lg:px-8'>
            <div className='flex-1 flex'>
              <form className='w-full flex md:ml-0' action='#' method='GET'>
                <label htmlFor='search-field' className='sr-only'>
                  Search
                </label>
                <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                  <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                    <SearchIcon className='h-5 w-5' aria-hidden='true' />
                  </div>
                  <input
                    id='search-field'
                    name='search-field'
                    className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm'
                    placeholder='Search'
                    type='search'
                  />
                </div>
              </form>
            </div>
            <div className='flex items-center'>
              {/* Profile dropdown */}
              <Menu as='div' className='ml-3 relative'>
                <div>
                  <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'>
                    <span className='sr-only'>Open user menu</span>
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        className='h-12 w-12 rounded-full'
                        alt={user.firstName + user.lastName}
                      />
                    ) : (
                      <Avatar
                        name={fullName}
                        size='45px'
                        className='rounded-full flex-shrink-0'
                        color='#26ADB4'
                      />
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/company-profile' passHref>
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Company profile
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/settings' passHref>
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Settings
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/roles' passHref>
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Post Role
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/faq' passHref>
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              FAQ
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/terms-and-conditions' passHref>
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              T&Cs
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href='/logout' passHref>
                            <a
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Logout
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
