import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import StoreInUsestate, {
  filterByDateTange,
  searchData,
  sortScreeningUserList,
} from '../../../utils/searchAndFilter';

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';

const RoleStatusStatistics = ({ roleStatistics }) => {
  const [statistics, setStatistics] = useState(roleStatistics);
  const [filtered, setFiltered] = useState(roleStatistics);
  const [searchInput, setSearchInput] = useState({
    title: '',
    company: '',
  });

  const [sorting, setsorting] = useState([]);
  const [typeSort, settypeSort] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  const tableColums = [
    'ID',
    'Title',
    'Company',
    'Saved By',
    'Applied By',
    'Average Match %',
    'Salary',
    'Posted At',
  ];

  useEffect(() => {
    setStatistics(roleStatistics);
    setFiltered(roleStatistics);
    setsorting(roleStatistics);
  }, [roleStatistics]);

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

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
    setDateRange({
      from: '',
      to: '',
    });
  };

  const getDataInDateRange = async () => {
    const filteredByDateData = await filterByDateTange(dateRange, statistics);
    setFiltered(filteredByDateData);
  };

  useEffect(() => {
    const tempSearchData = searchData(searchInput, statistics);
    setFiltered(tempSearchData);
  }, [searchInput]);

  useEffect(() => {
    setFiltered(sorting);
  }, [typeSort, sorting]);

  return (
    <>
      <div className='max-w-[100%] rounded shadow-lg p-5 mt-[20px]'>
        <div className='flex justify-start'>
          <h1 className='p-2 py-4'>
            Role Statistics :{' '}
            {statistics.length <= 0
              ? 'Please Wait we are preparing Data for you...'
              : ''}
          </h1>
          <button
            className='mr-2 bg-[#1F2937] h-8 px-5 text-white rounded-[5px] text-sm mt-3 ml-10'
            onClick={clearSearch}
          >
            Clear Search
          </button>
        </div>
        <div className='w-[60%] flex justify-between items-center ml-2 mb-5'>
          <p>Get Roles from </p>

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
            Get Roles
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
                  <div className='flex ml-[5px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('savedAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('savedDescending');
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className='flex ml-[5px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('aplliedAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('appliedDescending');
                      }}
                    />
                  </div>
                </td>
                <td>
                  <div className='flex ml-[5px]'>
                    <ArrowUpIcon
                      className='mr-1 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('averageMatchAscending');
                      }}
                    />
                    <ArrowDownIcon
                      className='mr-3 flex-shrink-0 h-3 w-6'
                      aria-hidden='true'
                      onClick={() => {
                        sortingAscendingDescending('averageMatchDescending');
                      }}
                    />
                  </div>
                </td>
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
                        {role?.saved ? role?.saved : 0}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.applied ? role?.applied : 0}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
                        {role?.score ? average(role.score).toFixed(2) : 0}
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RoleStatusStatistics;
