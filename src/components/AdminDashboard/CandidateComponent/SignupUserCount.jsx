import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../firebase/clientApp';
import { format } from 'date-fns';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';
import StoreInUsestate, {
  filterByDateTange,
  searchData,
  sortScreeningUserList,
} from '../../../utils/searchAndFilter';

const SignupUserCount = ({ setTotalSigneduser }) => {
  const [userData, setUserdata] = useState({
    users: [],
    count: 0,
  });

  const [filtered, setFiltered] = useState({
    users: [],
    count: 0,
  });

  const [searchInput, setSearchInput] = useState({
    firstName: '',
    email: '',
  });

  const [sorting, setsorting] = useState([]);

  const [typeSort, settypeSort] = useState([]);

  const tableColums = ['ID', 'Username', 'Email', 'Signup On'];

  const [dateRange, setDateRange] = useState({
    from: '',
    to: '',
  });

  const getDataInDateRange = async () => {
    const filteredByDateData = await filterByDateTange(
      dateRange,
      userData.users
    );
    console.log(filteredByDateData);
    setFiltered({
      users: filteredByDateData,
      count: filteredByDateData.length,
    });
  };

  const getSignedUserCount = async () => {
    let userData = [];
    const coll = collection(firestore, 'users');
    const snapshot = await getDocs(coll);

    snapshot.forEach((user) => {
      userData.push(user.data());
    });

    setUserdata({
      users: userData ? userData : [],
      count: userData ? userData.length : 0,
    });

    setFiltered({
      users: userData ? userData : [],
      count: userData ? userData.length : 0,
    });
  };

  const sortingAscendingDescending = async (sortRequest) => {
    settypeSort(sortRequest);
    const orderedData = await sortScreeningUserList(
      filtered.users,
      sortRequest
    );
    setsorting({
      users: orderedData,
      count: orderedData.count,
    });
  };

  const clearSearch = () => {
    setSearchInput({
      firstName: '',
      email: '',
    });
    setDateRange({
      from: '',
      to: '',
    });
  };

  useEffect(() => {
    setTotalSigneduser(userData.count);
  }, [userData]);

  useEffect(() => {
    getSignedUserCount();
  }, []);

  useEffect(() => {
    const tempSearchData = searchData(searchInput, userData.users);
    setFiltered({
      users: tempSearchData,
      count: tempSearchData?.length,
    });
  }, [searchInput]);

  useEffect(() => {
    setFiltered(sorting);
  }, [typeSort, sorting]);

  if (userData.count === 0) return <div className='loading' />;

  return (
    <div className='max-w-[100%] rounded shadow-lg p-5'>
      <div className='flex justify-between'>
        <h1 className='p-2 py-4'>
          Number of candidate signup For portal -{' '}
          <strong>
            Total Verified User :{' '}
            {userData.count !== 0 ? userData.count : 'Loading...'}{' '}
          </strong>
        </h1>
        <button
          className='mr-2 bg-[#1F2937] h-8 px-5 text-white rounded-[5px] text-sm mt-3'
          onClick={clearSearch}
        >
          Clear
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
                  className='border-2 h-[25px] text-black pl-2 search-input-style'
                  name='firstName'
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.firstName}
                />
              </td>
              <td>
                <input
                  className='border-2 h-[25px] text-black pl-2 search-input-style'
                  name='email'
                  onChange={(e) => {
                    StoreInUsestate.handleChange(e, setSearchInput);
                  }}
                  value={searchInput.email}
                />
              </td>
              <td>
                <div className='flex ml-[15px]'>
                  <ArrowUpIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('signupAtAscending');
                    }}
                  />
                  <ArrowDownIcon
                    className='mr-3 flex-shrink-0 h-3 w-6'
                    aria-hidden='true'
                    onClick={() => {
                      sortingAscendingDescending('signupAtDescending');
                    }}
                  />
                </div>
              </td>
            </tr>
          </thead>
          <tbody className='text-sm divide-y divide-gray-200'>
            {filtered.users?.length &&
              filtered.users.map((user, index) => (
                <tr key={index}>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>{index}</div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {`${user?.firstName} ${
                        user?.lastName ? user?.lastName : ''
                      }`}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {user.email}
                    </div>
                  </td>
                  <td className='p-2'>
                    <div className='font-medium text-gray-800'>
                      {user?.createdAt
                        ? format(
                            new Date(user.createdAt.toDate()),
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
  );
};

export default SignupUserCount;
