import { ChevronLeftIcon, PencilIcon } from '@heroicons/react/solid';
import { ShareIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { format } from 'date-fns';
import { doc, where } from 'firebase/firestore';
import AuthRoute from '../../components/context/authRoute';
import SideBar from '../../components/layout/Sidebar';
import { firestore } from '../../../firebase/clientApp';
import { formatDateInArray } from '../../utils/commands';
import Footer from '../../components/layout/Footer';

const tabs = [
  { name: 'Role', href: '#', current: true },
  { name: 'Applicants', href: '#', current: false },
  { name: 'Hiring Managers', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ViewRole() {
  const router = useRouter();
  const { id } = router.query;
  const ref = doc(firestore, 'companyRolesV2', id);
  const data = useFirestoreDocument(['companyRolesV2', id], ref);
  if (data.isLoading) {
    return <div>Loading...</div>;
  }
  const snapshot = data.data;
  const role = snapshot.data();

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
                    <span>Directory</span>
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
                            </h1>
                          </div>
                          <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                            <button
                              type='button'
                              className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                            >
                              <PencilIcon
                                className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                              <span>Edit</span>
                            </button>
                            <button
                              type='button'
                              className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                            >
                              <ShareIcon
                                className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                                aria-hidden='true'
                              />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                        <h1 className='text-2xl font-bold text-gray-900 truncate'>
                          {role.title}
                        </h1>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className='mt-6 sm:mt-2 2xl:mt-5'>
                    <div className='border-b border-gray-200'>
                      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <nav
                          className='-mb-px flex space-x-8'
                          aria-label='Tabs'
                        >
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              href={tab.href}
                              className={classNames(
                                tab.current
                                  ? 'border-pink-500 text-gray-900'
                                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                              )}
                              aria-current={tab.current ? 'page' : undefined}
                            >
                              {tab.name}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* Description list */}
                  <div className='mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Location
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.location}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Department
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.department}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Experience
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.experience}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Qualification
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.qualification}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          How To Apply
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.howToApply}
                        </dd>
                      </div>
                      {role.website && (
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Website
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {role.website}
                          </dd>
                        </div>
                      )}
                      {role.email && (
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Email
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {role.email}
                          </dd>
                        </div>
                      )}

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Behaviour Attributes Strengths
                        </dt>
                        <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                          {role.behaviourAttributesStrengths
                            ? role.behaviourAttributesStrengths.map((item) => (
                                <li key={item}>{item}</li>
                              ))
                            : null}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Technical Skills
                        </dt>
                        <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                          {role.technicalSkills
                            ? role.technicalSkills.map((item) => (
                                <li key={item}>{item}</li>
                              ))
                            : null}

                          <p className='pt-2'>
                            Other information about the skills:{' '}
                            {role.technicalSkillsOther}
                          </p>
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Requires cover letter
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.coverLetter === true ? (
                            <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                              Yes
                            </dd>
                          ) : (
                            <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                              No
                            </dd>
                          )}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Requires prescreening
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.prescreening === true ? (
                            <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                              Yes
                            </dd>
                          ) : (
                            <dd className='mt-1 max-w-prose text-sm text-gray-900'>
                              No
                            </dd>
                          )}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Role posted on
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {format(
                            new Date(role.createdAt.toDate()),
                            'dd-MMM-yyyy'
                          )}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Role last edited on
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {format(
                            new Date(role.updatedAt.toDate()),
                            'dd-MMM-yyyy'
                          )}
                        </dd>
                      </div>

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Start Date
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {format(
                            new Date(role.createdAt.toDate()),
                            'dd-MMM-yyyy'
                          )}
                        </dd>
                      </div>
                      {!role.rolling ? (
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Deadline
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {format(
                              new Date(role.updatedAt.toDate()),
                              'dd-MMM-yyyy'
                            )}
                          </dd>
                        </div>
                      ) : (
                        <div className='sm:col-span-1'>
                          <dt className='text-sm font-medium text-gray-500'>
                            Rolling
                          </dt>
                          <dd className='mt-1 text-sm text-gray-900'>
                            {role.rolling}
                          </dd>
                        </div>
                      )}

                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Position Type
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.positionType}
                        </dd>
                      </div>
                      <div className='sm:col-span-1'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Salary
                        </dt>
                        <dd className='mt-1 text-sm text-gray-900'>
                          {role.salary}
                        </dd>
                      </div>

                      <div className='sm:col-span-2'>
                        <dt className='text-sm font-medium text-gray-500'>
                          Description
                        </dt>
                        <dd className='mt-1 max-w-prose text-sm text-gray-900 space-y-5'>
                          {role.description}
                        </dd>
                      </div>

                      <div className='sm:col-span-2'>
                        <dt className='text-sm font-medium text-gray-500'>
                          More Information about the role
                        </dt>
                        <dd className='mt-1 max-w-prose text-sm text-gray-900 space-y-5'>
                          {role.moreRoleInfo}
                        </dd>
                      </div>
                    </dl>
                  </div>
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
