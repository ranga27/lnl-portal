import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCompanyRoles } from '../../../firebase/firestoreService';

export default function RolesList({ userId }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getCompanyRoles(userId).then((results) => {
      if (results.length > 0) {
        setRoles(results);
      }
      return null;
    });
  }, [userId]);

  return (
    <div className='mt-8'>
      {roles.length !== 0 && (
        <h3
          className='px-3 text-xs font-semibold text-gray-500 tracking-wider'
          id='desktop-teams-headline'
        >
          Roles
        </h3>
      )}
      <div
        className='mt-1 space-y-1'
        role='group'
        aria-labelledby='desktop-teams-headline'
      >
        {roles.map((role) => (
          <Link href={`/roles/${role.id}`} key={role.id}>
            <a className='group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:text-gray-900 hover:bg-gray-50'>
              <span
                className='bg-[#26ADB4] w-2.5 h-2.5 mr-4 rounded-full'
                aria-hidden='true'
              />
              <span className='truncate'>{role.title}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
