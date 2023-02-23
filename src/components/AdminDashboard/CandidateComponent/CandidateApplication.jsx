import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../firebase/clientApp';
import StoreInUsestate, {
  filterByDateTange,
  searchData,
  sortScreeningUserList,
} from '../../../utils/searchAndFilter';

import { format } from 'date-fns';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/outline';

const CandidateApplication = () => {
  const [applications, setApplication] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sorting, setsorting] = useState([]);
  const [dataToFilter, setDataToFilter] = useState([]);
  const [searchInput, setSearchInput] = useState({
    userFullName: '',
    applicantEmail: '',
    company: '',
    roleTitle: '',
  });
  const [typeSort, settypeSort] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  const tableColums = [
    'ID',
    'Username',
    'Applicant Email',
    'Role',
    'Company',
    'Applied At',
    'Match %',
    'Status',
  ];

  const getDataInDateRange = async () => {
    const filteredByDateData = await filterByDateTange(
      dateRange,
      applications,
      'appliedAt'
    );
    setFiltered(filteredByDateData);
  };

  const clearSearch = () => {
    setSearchInput({
      userFullName: '',
      applicantEmail: '',
      company: '',
      roleTitle: '',
    });
    setDateRange({
      from: '',
      to: '',
    });
  };

  const getApplicationData = async () => {
    let applicationData = [];
    const coll = collection(firestore, 'appliedRoles');
    const snapshot = await getDocs(coll);

    snapshot.forEach((application) => {
      applicationData.push(application.data());
    });

    setApplication(applicationData);
    setFiltered(applicationData);
    setDataToFilter(applicationData);
  };

  const sortingAscendingDescending = async (sortRequest) => {
    settypeSort(sortRequest);
    const orderedData = await sortScreeningUserList(dataToFilter, sortRequest);
    setsorting(orderedData);
  };

  useEffect(() => {
    const tempSearchData = searchData(searchInput, applications);
    setFiltered(tempSearchData);
    setDataToFilter(tempSearchData);
  }, [searchInput]);

  useEffect(() => {
    setFiltered(sorting);
  }, [typeSort, sorting]);

  useEffect(() => {
    getApplicationData();
  }, []);

  if (applications.length <= 0 || applications.length <= undefined)
    return <div className='loading'></div>;

  return (
    <div className='max-w-[100%] rounded shadow-lg p-5 mt-5'>
      <div className='flex justify-between'>
        <h1 className='p-2 py-4'>
          Application List -{' '}
          <strong>
            Total Applications :{' '}
            {applications.count !== 0 ? applications.length : 'Loading...'}{' '}
          </strong>
        </h1>
        <button
          className='bg-[#1F2937] h-8 px-5 text-white rounded-[5px] text-sm z-20'
          onClick={clearSearch}
        >
          Clear Search
        </button>
      </div>
      <div className='w-[60%] flex justify-between items-center ml-2 mb-5'>
        <p>Get Users from </p>

        <input
          type='date'
          style={{ width: '150px' }}
          name='from'
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setDateRange);
          }}
          value={dateRange.from}
        />

        <p>to </p>

        <input
          type='date'
          style={{ width: '150px' }}
          name='to'
          onChange={(e) => {
            StoreInUsestate.handleChange(e, setDateRange);
          }}
          value={dateRange.to}
        />

        <button
          className='bg-[#1F2937] h-8 px-5 text-white rounded-[5px] text-sm'
          onClick={getDataInDateRange}
        >
          Get Users
        </button>
      </div>
      <div className='h-[300px] overflow-auto'>
        <table className='table-auto w-full'>
          <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0 p-0'>
            <tr>
              {tableColums.map((col) => (
                <th className='p-2' key={col}>
                  <div className='font-semibold text-left'>{col}</div>
                </th>
              ))}
            </tr>
            <tr>
              <td />
              <td>
                <input
                  className='border-2 h-[25px] text-black pl-2 search-input-style'
                  name='userFullName'
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.userFullName}
                />
              </td>
              <td>
                <input
                  className='border-2 h-[25px] text-black pl-2 search-input-style'
                  name='applicantEmail'
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.applicantEmail}
                />
              </td>
              <td>
                <input
                  className='border-2 h-[25px] text-black pl-2 search-input-style'
                  name='roleTitle'
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.roleTitle}
                />
              </td>
              <td>
                <input
                  className='border-2 h-[25px] text-black pl-2 search-input-style'
                  name='company'
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.company}
                />
              </td>
              <td>
                <div className='flex ml-[15px]'>
                  <ArrowUpIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('appliedAtAscending');
                    }}
                  />
                  <ArrowDownIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('appliedAtDescending');
                    }}
                  />
                </div>
              </td>
              <td>
                <div className='flex ml-[5px]'>
                  <ArrowUpIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('matchAscending');
                    }}
                  />
                  <ArrowDownIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('matchDescending');
                    }}
                  />
                </div>
              </td>
              <td>
                <div className='flex ml-[5px]'>
                  <ArrowLeftIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('getRejectedApplication');
                    }}
                  />
                  <ArrowDownIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('getPendingApplication');
                    }}
                  />
                  <ArrowRightIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('getAcceptedApplication');
                    }}
                  />
                </div>
              </td>
            </tr>
          </thead>
          <tbody className='text-sm divide-y divide-gray-200'>
            {filtered?.length &&
              filtered.map((user, index) => (
                <tr key={index}>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>{index}</div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {user.userFullName}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {user.applicantEmail}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {user.roleTitle}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {user.company}
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div className='font-medium text-gray-800'>
                      {user?.appliedAt
                        ? format(
                            new Date(user.appliedAt.toDate()),
                            'dd-MMM-yyyy'
                          )
                        : 'No Date Found'}
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div className='font-medium text-gray-800'>
                      {user.match}%
                    </div>
                  </td>
                  <td className='p-2 text-center'>
                    <div className='font-medium text-gray-800'>
                      {user.status}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateApplication;
