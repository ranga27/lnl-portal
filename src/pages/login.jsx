import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthSignInWithEmailAndPassword } from '@react-query-firebase/auth';
import IntlMessages from '../utils/IntlMessages';
import { TextInput } from '../components/UI/Form/Input';
import { CheckBox } from '../components/UI/Form/CheckBox';
import { signInSchema } from '../components/schemas/loginSchema';
import GoogleSignIn from '../components/layout/googleSignIn';
import TwitterSignIn from '../components/layout/twitterSignIn';
import FacebookSignIn from '../components/layout/facebookSignIn';
import { auth } from '../../firebase/clientApp';
import { AuthContext } from '../components/context/AuthContext';
export default function Login() {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    router.push('/dashboard');
  }

  const defaultValues = {
    email: '',
    password: '',
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(signInSchema),
  });

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onSuccess(userCred) {
      console.debug('User is signed in!');
      if (userCred.user) {
        router.push('/dashboard');
      }
    },
    onError() {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please try again or create an account if you have not done that',
      });
    },
  });

  const handleUserLogin = async (data) => {
    if (!mutation.isLoading) {
      mutation.mutate(data);
    }
  };
  return (
    <div>
      <section className='h-screen max-w-5xl mx-auto'>
        <div className='px-6 xl:px-24 h-full text-gray-800'>
          <div className='flex xl:justify-between lg:justify-between justify-center items-center flex-wrap h-full g-6'>
            <div className=''>
              <div className='w-48 h-48 relative text-center mx-auto'>
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
              <form onSubmit={handleSubmit(handleUserLogin)}>
                <div className='flex flex-row items-center justify-center lg:justify-start'>
                  <p className='text-3xl font-extrabold text-gray-900 mb-8 mr-4'>
                    {' '}
                    <IntlMessages id='user.loginWith' />
                  </p>
                </div>
                <div className='mx-auto text-center mb-8'>
                  <GoogleSignIn />

                  <TwitterSignIn />

                  <FacebookSignIn />
                </div>
                <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
                  <p className='text-center font-semibold mx-4 mb-0'>
                    {' '}
                    <IntlMessages id='user.or' />
                  </p>
                </div>
                <TextInput
                  name='email'
                  label='Email address'
                  errors={errors.email}
                  control={control}
                  data-cy='login-email-input'
                />
                <TextInput
                  name='password'
                  label='Password'
                  errors={errors.password}
                  control={control}
                  type='password'
                  data-cy='login-password-input'
                />

                <div className='flex justify-between items-center mb-6'>
                  <div className='form-group form-check'>
                    <CheckBox
                      name='rememberMe'
                      label='Remember me'
                      control={control}
                    />
                  </div>
                  <Link href='/forgot-password'>
                    <a
                      className='mt-4 text-sm text-black underline'
                      data-cy='forgot-password-page-link'
                    >
                      <IntlMessages id='user.forgot-password-question' />
                    </a>
                  </Link>
                </div>

                <div className='text-center lg:text-left'>
                  <button
                    type='submit'
                    data-cy='login-submit-button'
                    className='text-center mx-auto px-7 py-3 bg-gray-900 text-white font-semibold text-sm leading-snug rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    <IntlMessages id='user.login-title' />
                  </button>
                  <p className='text-sm font-normal mt-2 pt-1 mb-0'>
                    <IntlMessages id='user.redirectSignUp' />
                    <Link href='/register' passHref>
                      <a className='text-black underline hover:text-[#F7B919] focus:text-[#F7B919] transition duration-200 ease-in-out'>
                        <IntlMessages id='user.registerSmall' />
                      </a>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
