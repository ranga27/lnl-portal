import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../firebase/clientApp';
import { format } from 'date-fns';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/outline';

import VerificationCountChart from './VerificationCountChart';
import StoreInUsestate, {
  searchData,
  sortScreeningUserList,
} from '../../../utils/searchAndFilter';

const UnverifiedUserCount = ({ totalSigneduser }) => {
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

  const getUnverifiedUserCount = async () => {
    let userData = [];
    const coll = collection(firestore, 'temporaryUsers');
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
  };

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

  useEffect(() => {
    getUnverifiedUserCount();
  }, []);

  if (userData.count === 0) return <div className='loading' />;

  return (
    <div
      className='w-[100%] flex justify-between mt-5'
      style={{ margin: 'auto' }}
    >
      <div className='w-[70%] rounded shadow-lg mt-5 p-5'>
        <div className='flex justify-between'>
          <h1 className='pb-5'>
            Unverified candidate on portal -{' '}
            <strong>
              Total Unverified User :{' '}
              {filtered.count !== 0 ? userData.count : 'Loading...'}{' '}
            </strong>
          </h1>
          <button
            className='bg-[#1F2937] h-8 px-5 text-white rounded-[5px] text-sm z-10'
            onClick={clearSearch}
          >
            Clear
          </button>
        </div>
        <div className='max-h-[250px] overflow-auto mt-5'>
          <table className='table-auto w-full'>
            <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50 sticky top-0 p-0'>
              <tr>
                {tableColums.map((col) => (
                  <th className='p-2'>
                    <div className='font-semibold text-left'>{col}</div>
                  </th>
                ))}
              </tr>
              <tr>
                <td></td>
                <td>
                  <input
                    className='border-2 h-[25px] w-[100px] text-black pl-2 search-input-style'
                    name='firstName'
                    onChange={(e) => {
                      StoreInUsestate.handleChange(e, setSearchInput);
                    }}
                    value={searchInput.firstName}
                  />
                </td>
                <td>
                  <input
                    className='border-2 h-[25px] w-[150px] text-black pl-2 search-input-style'
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
                  <tr>
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
      <VerificationCountChart
        totalSigneduser={totalSigneduser}
        totalUnverifiedUser={userData.count}
        className='m-w-[30%]'
      />
    </div>
  );
};

export default UnverifiedUserCount;
