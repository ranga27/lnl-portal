import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { dashboardJoyRide } from '../data/JoyrideConstants';
import {
  BriefcaseIcon,
  UserGroupIcon,
  OfficeBuildingIcon,
  ChartSquareBarIcon,
} from '@heroicons/react/outline';
import ProductTour from '../ProductTour';
import { AuthContext } from '../context/AuthContext';
import {
  fetchUserProfileDataFromFirestore,
  getCompanyApplicants,
  getCompanyDashboardMetrix,
} from '../../../firebase/firestoreService';
import { format } from 'date-fns';
import DeleteRole from './DeleteRole';

const DashboardContainer = () => {
  // USER AUTH
  const {
    userData: { userId },
  } = useContext(AuthContext);

  //DELETE ROLE
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [user, setUser] = useState([]);

  const handleDeleteRole = (id) => {
    setDeleteStatus(true);
    setDeleteId(id);
  };

  // GET ROLES
  const [postedRole, setpostedRole] = useState([]);
  useEffect(() => {
    userId &&
      getCompanyDashboardMetrix(userId).then(
        (result) => result?.length && setpostedRole([...result])
      );
  }, [userId, deleteId]);

  const [applicants, setApplicants] = useState([]);
  useEffect(() => {
    userId &&
      getCompanyApplicants(userId).then(
        (result) => result?.length && setApplicants([...result])
      );
  }, [userId]);

  useEffect(() => {
    fetchUserProfileDataFromFirestore(userId).then((results) => {
      setUser(results);
      setLoading(true);
    });
  }, [userId, loading]);

  const acceptedApplicants = applicants.filter((x) => x.status === 'Accepted');
  const rejectedApplicants = applicants.filter((x) => x.status === 'Rejected');
  const pendingApplicants = applicants.filter(
    (x) => x.status === 'Pending Review'
  );

  if (!user.firstName) {
    return <div className='loading' />;
  }
  
  return (
    <div className='container mt-6 mx-auto px-4 md:px-12'>
      {deleteStatus && <DeleteRole id={deleteId} />}
      {loading && user.tourCompleted ? null : (
        <ProductTour JoyRideCustomConstant={dashboardJoyRide} userId={userId} />
      )}
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
            <h2 className='text-xl font-bold mb-2 text-gray-800'>
              {postedRole ? postedRole.length : 0}
            </h2>
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
                Total No of Applicants
              </h2>
              <div className='flex justify-around '>
                <UserGroupIcon className='w-12 h-12 text-gray-700' />
              </div>
            </div>
            <h2 className='text-xl font-bold mb-2 text-gray-800'>
              {applicants.length}
            </h2>
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
            <h2 className='text-xl font-bold mb-2 text-gray-800'>1</h2>
            <div className='text-left'>
              <Link href='/settings' passHref>
                <a className='text-black hover:text-[#F7B919]'>Coming soon</a>
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
                  {postedRole &&
                    postedRole?.map((item, index) => (
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
                          <div className='text-left font-medium'>
                            {format(item.createdAt?.toDate(), 'dd-MMM-yyyy')}
                          </div>
                        </td>
                        <td className='p-2'>
                          <div className='flex justify-center text-gray-800'>
                            <button onClick={() => handleDeleteRole(item.id)}>
                              <svg
                                className='w-8 h-8 hover:text-[#F7B919] rounded-full hover:bg-gray-100 p-1'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http:www.w3.org/2000/svg'
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
                  {/* {metrics.map((item, index) => ( */}
                  <tr>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        Total No of Accepted Candidates
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='text-left'>
                        {acceptedApplicants.length}
                      </div>
                    </td>

                    <td className='p-2'>
                      <div className='flex justify-center text-gray-800'>
                        <ChartSquareBarIcon className='w-8 h-8 hover:bg-gray-100 rounded-full h p-1' />
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        Total No of Rejected Candidates
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='text-left'>
                        {rejectedApplicants.length}
                      </div>
                    </td>

                    <td className='p-2'>
                      <div className='flex justify-center text-gray-800'>
                        <ChartSquareBarIcon className='w-8 h-8 hover:bg-gray-100 rounded-full h p-1' />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        Total No of Candidates Pending Review
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='text-left'>
                        {pendingApplicants.length}
                      </div>
                    </td>

                    <td className='p-2'>
                      <div className='flex justify-center text-gray-800'>
                        <ChartSquareBarIcon className='w-8 h-8 hover:bg-gray-100 rounded-full h p-1' />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby='recent-applicants-title' className='mb-12'>
        <div
          className='my-4 rounded-lg bg-white overflow-hidden shadow-lg border border-gray-200'
          id='all-applicants'
        >
          <header className='px-5 py-4 border-b border-gray-100'>
            <div className='font-semibold text-gray-800'>All Applicants</div>
          </header>

          <div className='overflow-x-auto p-3 max-h-96 overflow-y-auto'>
            <table className='table-auto w-full'>
              <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                <tr>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Email</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Role Title</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Match</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>Status</div>
                  </th>
                  <th className='p-2'>
                    <div className='font-semibold text-left'>
                      Application Date
                    </div>
                  </th>
                  <th className='p-2' id='delete-role-button'>
                    <div className='font-semibold text-center'></div>
                  </th>
                </tr>
              </thead>

              <tbody className='text-sm divide-y divide-gray-200'>
                {applicants &&
                  applicants?.map((item, index) => (
                    <tr key={index}>
                      <td className='p-2'>
                        <div className='font-medium text-gray-800'>
                          {item.applicantEmail}
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left'>
                          <Link href={`/roles/${item.roleId}`}>
                            <a className='hover:text-[#F7B919]'>
                              {item.roleTitle}
                            </a>
                          </Link>
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left font-medium'>
                          {item.match}
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left font-medium'>
                          {item.status}
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='text-left font-medium'>
                          <div className='text-left font-medium'>
                            {format(item.appliedAt?.toDate(), 'dd-MMM-yyyy')}
                          </div>
                        </div>
                      </td>
                      <td className='p-2'>
                        <div className='flex justify-center text-gray-800'>
                          <div>
                            <Link href='/applicants'>
                              <a className='inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50'>
                                View
                              </a>
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DashboardContainer;
