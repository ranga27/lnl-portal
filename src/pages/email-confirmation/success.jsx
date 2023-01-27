/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import React from 'react';
import { lnlLogo } from '../../components/data/constants';

const SuccessMessage = () => (
  <div>
    <section className='h-screen max-w-2xl mx-auto'>
      <div className='py-48 xl:py-64 h-full text-gray-800'>
        <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
          <div className='w-48 h-48 relative text-center mx-auto'>
            <img src={lnlLogo} alt='Loop Not Luck' className='w-full' />
          </div>
          <div>
            <p className='text-center text-3xl font-extrabold text-gray-900 mb-8'>
              Email Confirmed!
            </p>

            <h4 className='text-center font-semibold mb-0'>
              Your email address has been confirmed successfully
              <br />
              please{' '}
              <Link href='/login'>
                <a className='text-black underline hover:text-[#F7B919] focus:text-[#F7B919] transition duration-200 ease-in-out'>
                  login
                </a>
              </Link>
            </h4>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SuccessMessage;
