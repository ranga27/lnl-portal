/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { CalendarIcon, OfficeBuildingIcon, LockOpenIcon } from '@heroicons/react/solid';
import { getRoles } from '../../../firebase/firestoreService';

const CompanyAside = ({ id, img, updatedAt, getRoleLength, credits }) => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles(id).then((results) => {
      setRoles(results);
      getRoleLength(results.length)
    });
  }, [id, getRoleLength]);

  return (
    <aside className='hidden xl:block xl:pl-8'>
      <h2 className='sr-only'>Details</h2>
      <div className='space-y-5 mt-24'>
        <img
          src={img}
          alt='Company logo'
          className='text-center mx-auto rounded-md w-36 h-36'
        />
         <div className='flex items-center space-x-2'>
          <LockOpenIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-gray-900 text-sm font-medium'>
           Invite Credits:  {credits}
          </span>
        </div>


        <div className='flex items-center space-x-2'>
          <OfficeBuildingIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-gray-900 text-sm font-medium'>
           Roles Created:  {roles.length}
          </span>
        </div>
        <div className='flex items-center space-x-2'>
          <CalendarIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
          <span className='text-gray-900 text-sm font-medium'>
            Last updated on {updatedAt}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default CompanyAside;
