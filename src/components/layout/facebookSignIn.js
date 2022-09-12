import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';

const FacebookSignIn = () => {
  const Router = useRouter();

  const loginHandler = useCallback(async () => {
    const provider = new FacebookAuthProvider();

    provider.addScope('public_profile');

    // additional scopes can be added as per requirement
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
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
      className='inline-block p-3 bg-gray-900 text-white font-medium text-xs leading-tight rounded-full shadow-md hover:bg-[#26ADB4] hover:shadow-lg focus:bg-[#26ADB4] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#26ADB4] active:shadow-lg transition duration-150 ease-in-out mx-1'
      onClick={loginHandler}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z'
        />
      </svg>
    </button>
  );
};

export default FacebookSignIn;
