/* eslint-disable @next/next/no-img-element */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../components/UI/Form/Input';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import {
  updatePassword,
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { updatePasswordSchema } from '../schemas/updatePasswordSchema';

export default function UpdatePassword() {
  const defaultValues = {
    password: '',
    confirmPassword: '',
    newPassword: '',
  };
  const alert = withReactContent(Swal);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(updatePasswordSchema),
  });

  const auth = getAuth();

  const user = auth.currentUser;

  const handleUpdateUser = async (data) => {
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      data.password
    );

    await reauthenticateWithCredential(user, credential).then(({ user }) => {
      updatePassword(user, data.newPassword)
        .then(() => {
          alert.fire({
            title: 'Awesome!',
            text: 'Password changes successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            iconColor: '#3085d6',
          });
        })
        .catch((error) => {
          alert.fire({
            title: 'Error',
            text: 'Error changing password, try again later',
            icon: 'error',
            imageHeight: 80,
            imageWidth: 80,
          });
        });
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
                    Please fill in the details below to change your account
                    password
                  </p>
                </div>

                <div className='mt-6 grid grid-cols-4 gap-x-6 gay-y-2'>
                  <div className='col-span-4 sm:col-span-4'>
                    <TextInput
                      name='password'
                      label='Enter Current Password'
                      errors={errors.password}
                      control={control}
                      data-cy='password-input'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-4'>
                    <TextInput
                      name='newPassword'
                      label='Enter New Password'
                      errors={errors.newPassword}
                      control={control}
                      data-cy='newPassword-input'
                    />
                  </div>

                  <div className='col-span-4 sm:col-span-4'>
                    <TextInput
                      name='confirmPassword'
                      label='Confirm New Password'
                      errors={errors.confirmPassword}
                      control={control}
                      data-cy='confirmPassword-input'
                    />
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
