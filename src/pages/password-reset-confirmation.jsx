/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { yupResolver } from '@hookform/resolvers/yup';
import { confirmPasswordReset } from 'firebase/auth';
import * as yup from 'yup';
import IntlMessages from '../utils/IntlMessages';
import { TextInput } from '../components/UI/Form/Input';
import { auth } from '../../firebase/clientApp';

const validatePassword = yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password')
    .min(8, 'Please use at least 8 characters'),
});

export default function ResetPassword() {
  const router = useRouter();
  const { query } = useRouter();
  const alert = withReactContent(Swal);
  const defaultValues = {
    password: '',
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validatePassword),
  });

  const onResetPassword = (values) => {
    confirmPasswordReset(auth, query.oobCode, values.password)
      .then(() => {
        alert.fire({
          title: 'Awesome!',
          text: 'Password has been changed. You can login now.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
          iconColor: '#3085d6',
        });
        router.push('/login');
      })
      .catch((err) => {
        alert.fire('Oops...', err.message, 'error');
      });
  };
  return (
    <div>
      <section className='h-screen max-w-5xl mx-auto'>
        <div className='px-6 xl:px-24 h-full text-gray-800'>
          <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
            <div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-6/12 md:w-9/12 md:mb-0'>
              <div className='w-48 h-48 relative text-center mx-auto'>
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/loop-luck.appspot.com/o/companyLogos%2Fwhite.png?alt=media&token=93b1b8cc-e66b-4c82-ac61-040e316c897b'
                  alt='Loop Not Luck'
                  className='w-full'
                />
              </div>
            </div>
            <div className='xl:ml-0 xl:w-7/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
              <form onSubmit={handleSubmit(onResetPassword)}>
                <div className='items-center justify-center lg:justify-start'>
                  <h2 className='text-lg text-semibold mb-0 mr-4'>
                    <IntlMessages id='user.reset-password' />
                  </h2>
                  <p className='mt-6 text-sm mb-0 mr-4'>
                    <IntlMessages id='user.resetPasswordText' />
                  </p>
                </div>

                <TextInput
                  name='password'
                  label='Password'
                  placeHolder='Enter new password'
                  errors={errors.password}
                  control={control}
                  type='password'
                />

                <div className='mt-6'>
                  <button
                    type='submit'
                    className='text-center mx-auto px-7 py-3 bg-gray-900 text-white font-semibold text-sm leading-snug rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    <IntlMessages id='general.submit' />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
