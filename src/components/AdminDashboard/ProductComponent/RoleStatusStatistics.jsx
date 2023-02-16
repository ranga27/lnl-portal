import React, { useEffect, useState } from 'react';
import { getSavedAppliedStatistics } from '../../../utils/getSavedAppliedStatistics';
import { format } from 'date-fns';

const RoleStatusStatistics = () => {
  const [roleStatistics, setRoleStatistics] = useState([]);
  const tableColums = [
    'ID',
    'Title',
    'Company',
    'Saved By',
    'Applied By',
    'Average Match %',
    'Salary',
    'Deadline',
  ];

  useEffect(async () => {
    const data = await getSavedAppliedStatistics();
    setRoleStatistics(data);
  }, []);

  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;

  return (
    <>
      <div className='max-w-[100%] rounded shadow-lg p-5'>
        <h1 className='p-2 py-4'>
          Role Statistics :{' '}
          {roleStatistics.length <= 0
            ? 'Please Wait we are preparing Data for you...'
            : ''}
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
              {roleStatistics?.length &&
                roleStatistics.map((role, index) => (
                  <tr>
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
                        {role?.deadline
                          ? format(
                              new Date(role.deadline.toDate()),
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
