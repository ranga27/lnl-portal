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
      <section className='h-screen'>
        <div className='px-6 xl:px-24 h-full text-gray-800'>
          <div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
            <div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-5/12 lg:w-6/12 md:w-9/12 md:mb-0'>
              <div className='w-48 h-48 xl:w-96 lg:w-24 md:w-24 xl:h-96 lg:h-24 md:h-24 relative text-center mx-auto'>
                <Image
                  src='/assets/white.png'
                  alt='Loop Not Luck'
                  layout='fill'
                  className='w-full'
                  objectFit='cover'
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
                  errors={errors.password}
                  control={control}
                  type='password'
                />

                <div className='mt-6 text-center '>
                  <button
                    type='submit'
                    className='inline-block px-7 py-3 bg-[#F7B919] text-white font-bold text-sm leading-snug uppercase rounded-md shadow-md hover:bg-[#F7B919] hover:shadow-lg focus:bg-[#F7B919] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#F7B919] active:shadow-lg transition duration-150 ease-in-out'
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