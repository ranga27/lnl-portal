/* eslint-disable @next/next/no-img-element */
import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';

const GoogleSignIn = () => {
  const Router = useRouter();

  const loginHandler = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    // additional scopes can be added as per requirement

    try {
      await signInWithPopup(auth, provider);
      Router.push('/');
    } catch (error) {
      console.log('error');
      alert(error);
    }
  }, [Router]);
  return (
    <button
      type='button'
      data-mdb-ripple='true'
      data-mdb-ripple-color='light'
      className='inline-block p-3 bg-[#F7B919] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#26ADB4] hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1'
      onClick={loginHandler}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 48 48'
        width='16px'
        height='16px'
      >
        <path
          fill='#FFFFFF'
          d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
        />
        <path
          fill='#FFFFFF'
          d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
        />
        <path
          fill='#FFFFFF'
          d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
        />
        <path
          fill='#FFFFFF'
          d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
        />
      </svg>
    </button>
  );
};

export default GoogleSignIn;