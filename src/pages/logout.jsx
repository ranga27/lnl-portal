import React, { useEffect } from 'react';
import { useAuthSignOut } from '@react-query-firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../../firebase/clientApp';

const Logout = () => {
  const mutation = useAuthSignOut(auth);
  const router = useRouter();

  const handleLogout = () => {
    try {
      mutation.mutate();
      router.push('/login');
    } catch (e) {
      throw new Error('Error while signing out');
    }
  };

  useEffect(() => {
    handleLogout();
  });
  return <div />;
};

export default Logout;
