import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore } from '../../../../firebase/clientApp';
import { format } from 'date-fns';

const SignupUserCount = () => {
  const [userData, setUserdata] = useState({
    users: [],
    count: 0,
  });

  const tableColums = ['ID', 'Username', 'Email', 'Signup On'];

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
  };

  useEffect(() => {
    getSignedUserCount();
  }, []);

  console.log(userData);

  if (userData.count === 0) return <div className='loading' />;

  return (
    <div className='max-w-[100%] rounded shadow-lg p-5'>
      <h1 className='p-2 py-4'>
        Number of candidate signup For portal -{' '}
        <strong>
          Total Verified User :{' '}
          {userData.count !== 0 ? userData.count : 'Loading...'}{' '}
        </strong>
      </h1>
      <div className='max-h-[250px] overflow-auto'>
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
  );
};

export default SignupUserCount;
