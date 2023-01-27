import { ArrowRightIcon, ChevronLeftIcon } from '@heroicons/react/solid';
import UpdateProfile from '../form/UpdateProfile';
import { fetchUserProfileDataFromFirestore } from '../../../firebase/firestoreService';
import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../components/context/AuthContext';
import UpdatePassword from '../form/UpdatePassword';

export default function SettingsContainer({}) {
  const [currentTab, setCurrentTab] = useState('account');
  const [user, setUser] = useState([]);

  const handleSettings = (data) => {
    setCurrentTab(data);
  };
  const {
    userData: { userId },
  } = useContext(AuthContext);

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId]);

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
                <span>Settings</span>
              </a>
            </nav>
            {currentTab === 'account' ? (
              <UpdateProfile user={user} userId={userId} />
            ) : (
              <UpdatePassword />
            )}
          </main>
          <aside className='hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200'>
            <div className='px-6 pt-6 pb-4'>
              <p className='mt-1 text-sm text-gray-600'>Actions</p>
            </div>
            <nav
              className='flex-1 min-h-0 overflow-y-auto'
              aria-label='Settings'
            >
              <div className='relative'>
                <div className='z-10 sticky top-0 border-t border-b border-gray-200 bg-gray-50 px-6 text-sm font-medium text-gray-500'></div>
                <ul
                  role='list'
                  className='relative z-0 divide-y divide-gray-200'
                >
                  <li>
                    <div className='px-6 py-5 space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#F7B919]'>
                      <button
                        type='button'
                        className='focus:outline-none'
                        onClick={() => handleSettings('account')}
                      >
                        <div className='flex w-full min-w-full '>
                          <p className='text-sm text-gray-900 font-medium truncate'>
                            Account
                          </p>
                        </div>
                        <div>
                          <small className='flex pt-2 text-gray-500 text-left'>
                            Edit your personal account details
                          </small>
                        </div>
                      </button>
                      <ArrowRightIcon
                        onClick={() => handleSettings('account')}
                        className='w-5 h-5 float-right'
                      />
                    </div>
                  </li>
                  <li>
                    <div className='px-6 py-5 space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#F7B919]'>
                      <button
                        type='button'
                        className='focus:outline-none'
                        onClick={() => handleSettings('password')}
                      >
                        <div className='flex w-full min-w-full '>
                          <p className='text-sm text-gray-900 font-medium truncate'>
                            Password
                          </p>
                        </div>
                        <div>
                          <small className='flex pt-2 text-gray-500 text-left'>
                            Change your password
                          </small>
                        </div>
                      </button>
                      <ArrowRightIcon
                        onClick={() => handleSettings('password')}
                        className='w-5 h-5 float-right'
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </div>
  );
}
