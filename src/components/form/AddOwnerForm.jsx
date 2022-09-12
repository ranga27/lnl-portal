import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { SelectField } from '../../components/UI/Form/SelectField';
import IntlMessages from '../../utils/IntlMessages';
import { users } from '../data/users';

export default function AddOwnerForm({
  handleChangeTab,
  handleLastTabButton,
  handleSaveFields,
  fields,
}) {
  const defaultValues = {
    managerId: fields.managerId || '',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    handleSaveFields(data);
    handleChangeTab('tab3');
    handleLastTabButton(true)
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white py-6 px-4 sm:p-6'>
          <div className='grid grid-cols-4 gap-x-6 gay-y-2'>
            <div className='col-span-4 sm:col-span-4'>
              <SelectField
                label='Hiring manager'
                name='managerId'
                control={control}
                options={users}
                data-cy='role-manager-select'
                menuPortalTarget={document.querySelector('body')}
              />
            </div>
          </div>

          <div className='py-6'>
            <p>
              Would you like hiring manager to review those that have applied or
              progress them on to the next step, select a user above to manage
              that process.
            </p>

            <span className='px-6 py-4 flex items-center text-sm font-medium'>
              <span className='flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-[#F7B919]'>
                <InformationCircleIcon
                  className='w-10 h-10 text-[#F7B919] '
                  aria-hidden='true'
                />
              </span>
              <span className='ml-4 text-sm font-medium text-gray-900'>
                You are the only user in the company so all Roles will be
                reviewed by you as default. You can invite a user to the
                platform for the hiring process.
              </span>{' '}
            </span>
          </div>
        </div>

        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button
            type='submit'
            className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
          >
            <IntlMessages id='roles.next' />
          </button>
        </div>
      </form>
    </Fragment>
  );
}
