import React, { useEffect, useState } from 'react';
import { getAllRoleData } from '../../../utils/getAllRoleData';
import { format } from 'date-fns';
import StoreInUsestate, {
  searchData,
  sortScreeningUserList,
} from '../../../utils/searchAndFilter';

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';

const PostedRoleStatistics = () => {
  const [roleData, setRoleData] = useState([]);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);

  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState({
    title: '',
    company: '',
    email: '',
  });

  const [sorting, setsorting] = useState([]);
  const [typeSort, settypeSort] = useState([]);

  const tableColums = [
    'ID',
    'Title',
    'Company',
    'Email',
    'Location',
    'Salary',
    'Posted',
    'Deadline',
    'Q/A',
    'Accepted App.',
    'Rejected App.',
  ];

  useEffect(() => {
    getAllRoleData()
      .then(({ roleData, acceptedCount, rejectedCount }) => {
        setAccepted(acceptedCount);
        setRejected(rejectedCount);
        setRoleData(roleData);
        setFiltered(roleData);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);

  const sortingAscendingDescending = async (sortRequest) => {
    settypeSort(sortRequest);
    const orderedData = await sortScreeningUserList(filtered, sortRequest);
    setsorting(orderedData);
  };

  const clearSearch = () => {
    setSearchInput({
      title: '',
      company: '',
      email: '',
    });
  };

  useEffect(() => {
    const tempSearchData = searchData(searchInput, roleData);
    setFiltered(tempSearchData);
  }, [searchInput]);

  useEffect(() => {
    setFiltered(sorting);
  }, [typeSort, sorting]);

  if (roleData.length <= 0 || roleData.length === undefined)
    return <div className='loading'></div>;

  return (
    <>
      <div className='max-w-[100%] rounded shadow-lg p-5'>
        <div className='flex justify-start'>
          <h1 className='p-2 py-4'>
            Number of posted role on portal -{' '}
            <strong>
              Total Roles :{' '}
              {roleData.length !== 0 ? roleData.length : 'Loading...'}{' '}
            </strong>
          </h1>
          <button
            className='mr-2 bg-[#1F2937] h-8 px-5 text-white rounded-[5px] text-sm mt-3 ml-10'
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
        <div className='max-h-[300px] overflow-auto'>
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
                <td></td>
                <td>
                  <input
                    className='border-2 h-[25px] w-[120px] text-black pl-2 search-input-style'
                    name='title'
                    onChange={(e) => {
                      StoreInUsestate.handleChange(e, setSearchInput);
                    }}
                    value={searchInput.title}
                  />
                </td>
                <td>
                  <input
                    className='border-2 h-[25px] w-[120px] text-black pl-2 search-input-style'
                    name='company'
                    onChange={(e) => {
                      StoreInUsestate.handleChange(e, setSearchInput);
                    }}
                    value={searchInput.company}
                  />
                </td>
                <td>
                  <input
                    className='border-2 h-[25px] w-[120px] ml-1 text-black pl-2 search-input-style'
                    name='email'
                    onChange={(e) => {
                      StoreInUsestate.handleChange(e, setSearchInput);
                    }}
                    value={searchInput.email}
                  />
                </td>
                <td />
                <td />
                <td>
                  <div className='flex ml-[5px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('rolePostedAtAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('rolePostedAtDescending');
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className='flex ml-[10px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('roleDeadlineAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('roleDeadlineDescending');
                      }}
                    />
                  </div>
                </td>
                <td />
                <td>
                  <div className='flex ml-[15px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('acceptedAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('acceptedDescending');
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className='flex ml-[15px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('rejectedAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('rejectedDescending');
                      }}
                    />
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className='text-sm divide-y divide-gray-200'>
              {filtered?.length &&
                filtered.map((role, index) => (
                  <tr key={index}>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>{index}</div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {`${role?.title}`}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.company ? role.company : 'NA'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.email ? role.email : 'NA'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.location
                          ? `${role.jobType}-${role.location}`
                          : 'NA'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.salary ? role.salary : 'N/A'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.createdAt
                          ? format(
                              new Date(role.createdAt.toDate()),
                              'dd-MMM-yyyy'
                            )
                          : 'No Date Found'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.deadline
                          ? format(
                              new Date(role.deadline.toDate()),
                              'dd-MMM-yyyy'
                            )
                          : 'No Date Found'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.isQuestion ? 'Yes' : 'No'}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800 text-center'>
                        {role?.accepted.length ? role?.accepted.length : 0}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800 text-center'>
                        {role?.rejected.length ? role?.rejected.length : 0}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot className='text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky bottom-0 p-0'>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className='p-2'>
                  <div className='font-semibold text-left'>
                    Total : {accepted}
                  </div>
                </td>
                <td className='p-2'>
                  <div className='font-semibold text-left'>
                    Total : {rejected}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default PostedRoleStatistics;
