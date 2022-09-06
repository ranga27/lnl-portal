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
} from '@heroicons/react/outline';
import { SearchIcon, SelectorIcon } from '@heroicons/react/solid';
import Avatar from 'react-avatar';
import { AuthContext } from '../context/AuthContext';
import { fetchUserProfileDataFromFirestore } from '../../../firebase/firestoreService';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: DesktopComputerIcon,
    current: false,
  },
  { name: 'Roles', href: '/roles', icon: BriefcaseIcon, current: false },
  {
    name: 'Manage Applicants',
    href: '/applicants',
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: 'Internal Company Profile',
    href: '/company-profile',
    icon: ShieldCheckIcon,
    current: false,
  },
  {
    name: 'External Company Profile',
    href: '/external-profile',
    icon: OfficeBuildingIcon,
    current: false,
  },
  { name: 'Settings', href: '/settings', icon: CogIcon, current: false },
  { name: 'Logout', href: '/logout', icon: LogoutIcon, current: false },
];
const teams = [
  { name: 'Role 1', href: '#', bgColorClass: 'bg-indigo-500' },
  { name: 'Role 2', href: '#', bgColorClass: 'bg-green-500' },
  { name: 'Role 3', href: '#', bgColorClass: 'bg-red-500' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SideBar({
  children,
  jobIndex,
  dashboard,
  applicants,
  companyPrivateProfile,
  externalProfile,
  settings,
}) {
  const [user, setUser] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    userData: { userId },
  } = useContext(AuthContext);

  fetchUserProfileDataFromFirestore;

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

  if (dashboard === true) {
    navigation[0].current = true;
  } else if (jobIndex === true) {
    navigation[1].current = true;
  } else if (applicants === true) {
    navigation[2].current = true;
  } else if (companyPrivateProfile === true) {
    navigation[3].current = true;
  } else if (externalProfile === true) {
    navigation[4].current = true;
  } else if (settings === true) {
    navigation[5].current = true;
  }

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
            <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-[#F7B919]'>
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
                <img
                  className='h-16 w-16'
                  src='https://firebasestorage.googleapis.com/v0/b/loop-luck.appspot.com/o/companyLogos%2FLoop%20Not%20Luck.png?alt=media&token=ace69d68-8e31-4333-9be1-34d4aac9e20e'
                  alt='LNL'
                />
              </div>
              <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                <nav className='px-2'>
                  <div className='space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                          'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className='mt-8'>
                    <h3
                      className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                      id='mobile-teams-headline'
                    >
                      Teams
                    </h3>
                    <div
                      className='mt-1 space-y-1'
                      role='group'
                      aria-labelledby='mobile-teams-headline'
                    >
                      {teams.map((team) => (
                        <a
                          key={team.name}
                          href={team.href}
                          className='group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50'
                        >
                          <span
                            className={classNames(
                              team.bgColorClass,
                              'w-2.5 h-2.5 mr-4 rounded-full'
                            )}
                            aria-hidden='true'
                          />
                          <span className='truncate'>{team.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
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
        <div className='flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-[#F7B919]'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='h-0 flex-1 flex flex-col overflow-y-auto'>
            {/* User account dropdown */}
            <Menu
              as='div'
              className='px-3 mt-6 relative inline-block text-left'
            >
              <div>
                <Menu.Button className='group w-full rounded-md px-3.5 py-2 text-sm text-left font-medium focus:outline-none focus:ring-2 focus:ring-[#F7B919]'>
                  <span className='flex w-full justify-between items-center'>
                    <span className='flex min-w-0 items-center justify-between space-x-3'>
                      <Avatar
                        name={user.firstName}
                        size='45px'
                        className='rounded-full flex-shrink-0'
                      />

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
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          View profile
                        </a>
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
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Settings
                        </a>
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
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Post Role
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          FAQ
                        </a>
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
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Support
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href='#'
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Logout
                        </a>
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
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-white text-gray-900 font-bold'
                        : 'text-white hover:text-gray-900 hover:bg-gray-50 font-bold',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-500'
                          : 'text-white group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className='mt-8'>
                {/* Secondary navigation */}
                <h3
                  className='px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider'
                  id='desktop-teams-headline'
                >
                  Roles
                </h3>
                <div
                  className='mt-1 space-y-1'
                  role='group'
                  aria-labelledby='desktop-teams-headline'
                >
                  {teams.map((team) => (
                    <a
                      key={team.name}
                      href={team.href}
                      className='group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:text-gray-900 hover:bg-gray-50'
                    >
                      <span
                        className={classNames(
                          team.bgColorClass,
                          'w-2.5 h-2.5 mr-4 rounded-full'
                        )}
                        aria-hidden='true'
                      />
                      <span className='truncate'>{team.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
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
                    <img
                      className='h-8 w-8 rounded-full'
                      src='https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt=''
                    />
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
                          <a
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            View profile
                          </a>
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
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Settings
                          </a>
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
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Notifications
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Get desktop app
                          </a>
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
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Support
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            Logout
                          </a>
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
