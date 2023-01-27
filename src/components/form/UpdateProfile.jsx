/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
import { serverTimestamp, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { TextInput } from '../../components/UI/Form/Input';
import { locations } from '../../components/data/locationBackup';
import { SelectField } from '../../components/UI/Form/SelectField';
import { uploadFile } from '../../utils/uploadFile';
import { v4 as uuidv4 } from 'uuid';
import { updateProfileSchema } from '../schemas/updateProfileSchema';

export default function UpdateProfile({ user, userId }) {
  const defaultValues = {
    firstName: user.firstName,
    lastName: user.lastName || '',
    location: user.location || '',
    mobileNumber: user.mobileNumber || '',
    photoUrl: user.photoUrl || '',
    email: user.email || '',
  };

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (user.firstName) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
        mobileNumber: user.mobileNumber,
      });
    }
  }, [user, reset]);

  const userRef = doc(firestore, 'companyUsers', userId);
  const userMutation = useFirestoreDocumentMutation(userRef, {
    merge: true,
  });

  const handleUpdateUser = async (data) => {
    const uid = uuidv4();

    const { photoUrl, ...rest } = data;
    if (photoUrl.lastModified) {
      const newPhotoUrl = await uploadFile(photoUrl, uid, 'profilePhotos');
      photoUrl = newPhotoUrl;
    }
    const newData = {
      photoUrl,
      ...rest,
      updatedAt: serverTimestamp(),
    };
    userMutation.mutate(newData, {
      onSuccess() {
        Swal.fire({
          title: 'Success!',
          text: 'Profile Updated.',
          icon: 'success',
          iconColor: '#3085d6',
          showConfirmButton: false,
        });
      },
      onError() {
        Swal.fire('Oops!', 'Failed to Update Your  Profile.', 'error');
      },
      onMutate() {
        console.info('updating...');
      },
    });
  };
  return (
    <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
      <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
        <section aria-labelledby='payment-details-heading'>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className='shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 sm:p-6'>
                <div>
                  <h2
                    id='payment-details-heading'
                    className='text-lg leading-6 font-medium text-gray-900'
                  >
                    Account details
                  </h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    Please fill in the details below to update your account
                    details
                  </p>
                </div>

                <div className='mt-6 grid grid-cols-4 gap-x-6 gay-y-2'>
                  <div className='col-span-4 sm:col-span-2'>
                    <TextInput
                      name='firstName'
                      label='First Name'
                      errors={errors.firstName}
                      control={control}
                      data-cy='first-name-input'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-2'>
                    <TextInput
                      name='lastName'
                      label='Last Name'
                      errors={errors.lastName}
                      control={control}
                      data-cy='last-name-input'
                    />
                  </div>

                  <div className='mt-4 col-span-4 sm:col-span-4 cursor-not-allowed'>
                    <TextInput
                      name='email'
                      label='Email Address (Cannot Edit)'
                      errors={errors.email}
                      control={control}
                      data-cy='email-input'
                      disabled
                    />
                  </div>

                  <div className='mt-4 col-span-4 sm:col-span-4'>
                    <TextInput
                      name='mobileNumber'
                      label='Phone Number'
                      errors={errors.mobileNumber}
                      control={control}
                      data-cy='mobileNumber-input'
                    />
                  </div>

                  <div className='mt-4 col-span-4 sm:col-span-4'>
                    <SelectField
                      label='Location'
                      name='location'
                      control={control}
                      options={locations}
                      data-cy='location-select'
                      menuPortalTarget={document.querySelector('body')}
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-2 mx-auto'>
                    {user.photoUrl ? (
                      <img
                        src={defaultValues.photoUrl}
                        className='h-48 w-48 pt-12'
                        alt={user.firstName + user.lastName}
                      />
                    ) : (
                      <div className='pt-24'>
                        <p>No Profile Photo added</p>
                      </div>
                    )}
                  </div>
                  <div className='mt-4 col-span-4 sm:col-span-2'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Cover photo
                    </label>
                    <div className='mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          ></path>
                        </svg>
                        <div className='text-sm text-gray-600'>
                          <label
                            htmlFor='photoUrl'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-[#F7B919] hover:text-[#F7B919] focus-within:outline-none focus-within:ring-none'
                          >
                            <span>Upload a file</span>

                            <div>
                              <input
                                type='file'
                                name='logoFile'
                                id='photoUrl'
                                onChange={(event) => {
                                  setValue(
                                    'photoUrl',
                                    event.currentTarget.files[0]
                                  );
                                }}
                                className='sr-only'
                              />
                            </div>
                          </label>
                        </div>
                        <p className='text-xs text-gray-500'>
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900'
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
