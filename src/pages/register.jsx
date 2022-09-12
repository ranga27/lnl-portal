import { useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { collection, serverTimestamp } from 'firebase/firestore';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import {
  useAuthCreateUserWithEmailAndPassword,
  useAuthSignOut,
} from '@react-query-firebase/auth';
import { useRouter } from 'next/router';
import IntlMessages from '../utils/IntlMessages';
import { signUpSchema } from '../components/schemas/registerSchema';
import { auth, firestore } from '../../firebase/clientApp';
import { TextInput } from '../components/UI/Form/Input';
import { CheckBox } from '../components/UI/Form/CheckBox';
import GoogleSignIn from '../components/layout/googleSignIn';
import TwitterSignIn from '../components/layout/twitterSignIn';
import FacebookSignIn from '../components/layout/facebookSignIn';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from '../components/UI/Modal';
import { TermsInfo } from '../components/layout/TermsInfo';

export default function Register() {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsSelected: false,
  };
  const router = useRouter();
  const alert = withReactContent(Swal);
  const confirmationHash = uuidv4();
  const signOut = useAuthSignOut(auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });
  const createUser = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      alert.fire({
        icon: 'error',
        title: 'Oops...',
        text: getUserError(error.message),
      });
    },
  });
  const createTempUser = useFirestoreCollectionMutation(
    collection(firestore, 'temporaryUsers')
  );
  const handleUserSignUp = async (values) => {
    const { email, password, firstName, lastName, termsSelected } = values;
    if (!createUser.isLoading && termsSelected === true) {
      createUser.mutate(
        { email, password },
        {
          onSuccess(data) {
            const { uid } = data.user;
            console.log(uid, 'created');
            createTempUser.mutate({
              uid,
              email,
              firstName,
              lastName,
              role: 'company',
              confirmationHash,
              createdAt: serverTimestamp(),
            });
            alert
              .fire({
                title: 'Awesome!',
                text: 'You are nearly in the loop. Please check your email to verify your account (check your spam/junk/promotions folder).',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                iconColor: '#3085d6',
              })
              .then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  signOut.mutate();
                  router.push('/login');
                }
              });
          },
        }
      );
    } else {
      alert.fire({
        title: 'Agree with T&Cs',
        text: 'Please agree with our terms and conditions before continuing',
        icon: 'error',
        imageHeight: 80,
        imageWidth: 80,
      });
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
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
              <form onSubmit={handleSubmit(handleUserSignUp)}>
                <div className='flex flex-row items-center justify-center lg:justify-start'>
                  <p className='text-3xl font-extrabold text-gray-900 mb-8 mr-4'>
                    {' '}
                    <IntlMessages id='user.registerWith' />
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
                <div className='grid grid-cols-4 gap-x-6'>
                  <div className='col-span-4 sm:col-span-4'>
                    <TextInput
                      name='email'
                      placeholder='Email address'
                      label='Email address'
                      errors={errors.email}
                      control={control}
                      data-cy='register-email-input'
                    />
                  </div>
                  <div className='mt-4 col-span-4 sm:col-span-2'>
                    <TextInput
                      name='firstName'
                      placeholder='First Name'
                      label='First Name'
                      errors={errors.firstName}
                      control={control}
                      data-cy='register-first-name-input'
                    />
                  </div>
                  <div className='mt-4 col-span-4 sm:col-span-2'>
                    <TextInput
                      name='lastName'
                      placeholder='Last Name'
                      label='Last Name'
                      errors={errors.lastName}
                      control={control}
                      data-cy='register-last-name-input'
                    />
                  </div>

                  <div className='mt-4 col-span-4 sm:col-span-2'>
                    <TextInput
                      name='password'
                      label='Password'
                      placeholder='Enter Password'
                      errors={errors.password}
                      control={control}
                      type='password'
                      data-cy='register-password-input'
                    />
                  </div>
                  <div className='mt-4 col-span-4 sm:col-span-2'>
                    <TextInput
                      name='confirmPassword'
                      label='Confirm Password'
                      placeholder='Confirm your Password'
                      errors={errors.confirmPassword}
                      control={control}
                      type='password'
                      data-cy='register-confirm-password-input'
                    />
                  </div>
                </div>
                <div className='flex'>
                  <CheckBox
                    name='termsSelected'
                    label='I agree with the'
                    control={control}
                    data-cy='register-agree-checkbox'
                  />
                  <button
                    type='button'
                    className='text-sm h-16 text-gray-900 underline hover:text-[#F7B919]'
                    onClick={() => handleOpenModal()}
                  >
                    <IntlMessages id='user.terms' />
                  </button>
                </div>

                {isModalOpen && (
                  <Modal
                    isOpen={isModalOpen}
                    setOpen={setIsModalOpen}
                    cancelButton={true}
                    confirmButton={true}
                    modalSize='xl'
                    title='TERMS AND CONDITIONS'
                    showIcon={false}
                    Content={TermsInfo}
                  />
                )}

                <div className='mt-4 text-center lg:text-left'>
                  <button
                    type='submit'
                    data-cy='register-submit-button'
                    className='text-center mx-auto px-7 py-3 bg-gray-900 text-white font-semibold text-sm leading-snug rounded shadow-md hover:bg-gray-900 hover:shadow-lg focus:bg-gray-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-900 active:shadow-lg transition duration-150 ease-in-out'
                  >
                    <IntlMessages id='user.register' />
                  </button>
                  <p className='text-sm font-normal mt-4 pt-1 mb-0'>
                    <IntlMessages id='user.redirectLogin' />
                    <Link href='/login'>
                      <a className='text-gray-900 underline hover:text-[#F7B919] focus:text-[#F7B919] transition duration-200 ease-in-out'>
                        <IntlMessages id='user.login' />
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
