import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../../../firebase/clientApp';
import { format } from 'date-fns';
import VerificationCountChart from './VerificationCountChart';

const UnverifiedUserCount = ({ totalSigneduser }) => {
  const [userData, setUserdata] = useState({
    users: [],
    count: 0,
  });

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
  };

  useEffect(() => {
    getUnverifiedUserCount();
  }, []);

  if (userData.count === 0) return <div className='loading' />;

  return (
    <div className='flex justify-start mt-5'>
      <div className='max-w-[60%] rounded shadow-lg mt-5 p-5'>
        <h1 className='pb-5'>
          Unverified candidate on portal -{' '}
          <strong>
            Total Unverified User :{' '}
            {userData.count !== 0 ? userData.count : 'Loading...'}{' '}
          </strong>
        </h1>
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
            </thead>
            <tbody className='text-sm divide-y divide-gray-200'>
              {userData.users.length &&
                userData.users.map((user, index) => (
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
        className='w-[40%]'
      />
    </div>
  );
};

export default UnverifiedUserCount;
