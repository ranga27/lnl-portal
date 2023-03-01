import { useState, useEffect, useContext } from 'react';
import { ChevronLeftIcon, PencilIcon } from '@heroicons/react/solid';
import { ShareIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { format } from 'date-fns';
import Link from 'next/link';
import { doc } from 'firebase/firestore';
import AuthRoute from '../../components/context/authRoute';
import SideBar from '../../components/layout/Sidebar';
import { firestore } from '../../../firebase/clientApp';
import Footer from '../../components/layout/Footer';
import RoleInfo from '../../components/containers/RoleInfo';
import RoleOwner from '../../components/containers/RoleOwner';
import { AuthContext } from '../../components/context/AuthContext';
import { fetchUserProfileDataFromFirestore } from '../../../firebase/firestoreService';
import CopyToClipboard from 'react-copy-to-clipboard';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const tabs = [
  { tab: 'tab1', name: 'Role', href: '#', current: true },
  { tab: 'tab2', name: 'Hiring Manager', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ViewRole() {
  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
    });
  }, [userId, user]);
  const router = useRouter();
  const {
    userData: { userId },
    currentUser,
  } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('tab1');
  const [user, setUser] = useState([]);
  const [copy, setCopy] = useState(false);

  const { id } = router.query;
  const ref = doc(firestore, 'roles', id);
  const data = useFirestoreDocument(['roles', id], ref);
  if (data.isLoading) {
    return <div>Loading...</div>;
  }

  const snapshot = data.data;
  const roleSnapshot = snapshot.data();

  const role = { id, ...roleSnapshot };
  let startDate = role.startDate
    ? format(new Date(role.startDate.toDate()), 'dd-MMM-yyyy')
    : null;
  let deadline = role.deadline
    ? format(new Date(role.deadline.toDate()), 'dd-MMM-yyyy')
    : null;

  const handleChangeTab = async (data) => {
    if (data === 'tab1') {
      setActiveTab('tab1');
    } else {
      setActiveTab('tab2');
    }
  };
  const alert = withReactContent(Swal);

  const copyAlert = () => {
    setCopy(true);
    alert.fire({
      title: 'Awesome!',
      text: 'Role link copied to clipboard',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      iconColor: '#3085d6',
    });
  };
  const copyLinkText = `https://loop-luck.web.app/roles/${id}`;

  return (
    <AuthRoute>
      <SideBar>
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
                    <span>Role</span>
                  </a>
                </nav>

                <article>
                  <div>
                    <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                      <div className=''>
                        <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                          <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                            <h1 className='text-2xl font-bold text-gray-900 truncate'>
                              {role.title}
                              <span className='text-sm text-gray-600'>
                                Added on
                                {format(
                                  new Date(role.createdAt.toDate()),
                                  'dd-MMM-yyyy'
                                )}
                              </span>
                            </h1>
                          </div>
                          <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                            <Link
                              href={{
                                pathname: '/roles/add',
                                query: {
                                  ...role,
                                  startDate: startDate,
                                  deadline: deadline,
                                },
                              }}
                            >
                              <a className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'>
                                <PencilIcon
                                  className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                                  aria-hidden='true'
                                />
                                <span>Edit</span>
                              </a>
                            </Link>

                            <CopyToClipboard
                              text={copyLinkText}
                              onCopy={() => copyAlert()}
                            >
                              <button
                                type='button'
                                className='inline-flex justify-center px-4 py-2 border border-none shadow-sm text-sm font-medium rounded-md text-black bg-[#F7B919] hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                              >
                                <ShareIcon
                                  className='-ml-1 mr-2 h-5 w-5 text-black'
                                  aria-hidden='true'
                                />
                                <span>Share</span>
                              </button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </div>
                      <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>
                          {role.title}
                        </h1>
                        <span className='text-sm text-gray-600'>
                          Added on{'  '}
                          {format(
                            new Date(role.createdAt.toDate()),
                            'dd-MMM-yyyy'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className='mt-6 sm:mt-2 2xl:mt-5'>
                    <div className='border-b border-gray-200'>
                      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <nav
                          className='-mb-px flex space-x-12'
                          aria-label='Tabs'
                        >
                          {tabs.map((tab) => (
                            <button
                              onClick={() => handleChangeTab(tab.tab)}
                              key={tab.name}
                              className={classNames(
                                tab.tab === activeTab
                                  ? 'border-[#F7B919] text-gray-900'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-[#F7B919]',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                              )}
                              aria-current={tab.current ? 'page' : undefined}
                            >
                              {tab.name}
                            </button>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>
                  {activeTab === 'tab1' ? (
                    <RoleInfo role={role} />
                  ) : activeTab === 'tab2' ? (
                    <RoleOwner user={user} />
                  ) : null}
                </article>
              </main>
            </div>
          </div>
        </div>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
