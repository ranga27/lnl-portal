/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Avatar from 'react-avatar';
import { getName } from '../../utils/commands';

export default function RoleOwner({ user }) {
  return (
    <div className='py-12 text-center'>
      <div className='mx-auto text-center'>
        {user.photoUrl ? (
          <img
            src={user.photoUrl}
            className='h-12 w-12 rounded-full'
            alt={user.firstName + user.lastName}
          />
        ) : (
          <Avatar
            name={getName(user.firstName) + ' ' + getName(user.lastName)}
            size='60px'
            className='rounded-full'
            color='#26ADB4'
          />
        )}
      </div>

      <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
        <h1 className='text-2xl font-bold text-gray-900 truncate'>
          {getName(user.firstName) + ' ' + getName(user.lastName)}
        </h1>

        <p className='text-sm'>
          You are the default hiring manager for this role so you will manage
          this applicants profile
        </p>
      </div>
    </div>
  );
}
