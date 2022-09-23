import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

const SuccessMessage = () => (
  <div>
    <section className='h-screen max-w-2xl mx-auto'>
      <div className='py-48 xl:py-64 h-full text-gray-800'>
        <div className='flex xl:justify-center lg:justify-center justify-center items-center flex-wrap'>
          <div className='w-48 h-48 relative text-center mx-auto'>
            <Image
              src='/assets/white.png'
              alt='Loop Not Luck'
              layout='fill'
              className='w-full'
              objectFit='cover'
            />
          </div>
          <div>
            <p className='text-center text-3xl font-extrabold text-gray-900 mb-8'>
              Problem confirming email!
            </p>

            <h4 className='text-center font-semibold mb-0'>
              It looks like something went wrong with your confirmation.
              <br />
              If you have confirmed earlier try to
              <br />
              please{' '}
              <Link href='/login'>
                <a className='text-black underline hover:text-[#F7B919] focus:text-[#F7B919] transition duration-200 ease-in-out'>
                  login
                </a>
              </Link>
              <br />
              But if you waited a while since creating your account,
              <br /> you may have to{' '}
              <Link href='/register'>
                <a className='text-black underline hover:text-[#F7B919] focus:text-[#F7B919] transition duration-200 ease-in-out'>
                  register
                </a>
              </Link>{' '}
              again.
            </h4>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default SuccessMessage;
