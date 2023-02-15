import React, { useEffect, useState } from 'react';
import { getAllRoleData } from '../../../utils/getAllRoleData';
import { format } from 'date-fns';

const PostedRoleStatistics = () => {
  const [roleData, setRoleData] = useState([]);
  const [accepted, setAccepted] = useState(0);
  const [rejected, setRejected] = useState(0);

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
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);

  if (roleData.length <= 0) return <div className='loading'></div>;

  return (
    <>
      <div className='max-w-[100%] rounded shadow-lg p-5'>
        <h1 className='p-2 py-4'>
          Number of posted role on portal -{' '}
          <strong>
            Total Roles :{' '}
            {roleData.length !== 0 ? roleData.length : 'Loading...'}{' '}
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
              {roleData.length &&
                roleData.map((role, index) => (
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
                      <div className='font-medium text-gray-800'>
                        {role?.accepted.length ? role?.accepted.length : 0}
                      </div>
                    </td>
                    <td className='p-2'>
                      <div className='font-medium text-gray-800'>
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
