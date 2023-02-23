import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { InformationCircleIcon } from '@heroicons/react/solid';
// import { SelectField } from '../../components/UI/Form/SelectField';
import IntlMessages from '../../utils/IntlMessages';
import { fetchCompanyUsers } from '../../../firebase/firestoreService';
import { TextInput } from '../UI/Form/Input';

export default function AddOwnerForm({
  handleChangeTab,
  handleSaveFields,
  companyUser,
}) {
  const defaultValues = {
    managerId: companyUser,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    handleSaveFields(data);
    handleChangeTab('tab3');
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCompanyUsers().then((results) => {
      setUsers(results);
    });
  }, []);

  const selectUserInfo = users.filter((user) => user.id === companyUser);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white py-6 px-4 sm:p-6'>
          <div className='grid grid-cols-4 gap-x-6 gay-y-2'>
            <div className='col-span-4 sm:col-span-4'>
              {/* <SelectField
                label='Hiring manager'
                name='managerId'
                control={control}
                options={usersList}
                data-cy='role-manager-select'
                defaultValue={defaultValues.managerId}
                menuPortalTarget={document.querySelector('body')}
              /> */}
              <TextInput
                name='managerId'
                label='Hiring Manager'
                errors={errors.managerId}
                control={control}
                data-cy='role-manager-select'
                value={
                  selectUserInfo.length !== 0
                    ? selectUserInfo[0].firstName +
                      ' ' +
                      selectUserInfo[0].lastName
                    : ''
                }
                disabled
              />
            </div>
          </div>

          <div className='py-6'>
            <p>
              Would you like a hiring manager to review those that have applied or
              progress them on to the next step, select a user above to manage
              that process.
            </p>
          </div>
        </div>

        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button
            type='submit'
            className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
          >
            <IntlMessages id='roles.next' />
          </button>
        </div>
      </form>
    </Fragment>
  );
}
