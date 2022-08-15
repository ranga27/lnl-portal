import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../components/UI/Form/Input';
import SideBar from '../../components/layout/Sidebar';
import { rolesSchema } from '../../components/schemas/rolesSchema';
import { positionTypes } from '../../components/data/positionTypes';
import { behaviourOptions } from '../../components/data/behaviourOptions';
import { rolesOfInterests } from '../../components/data/rolesOfInterests';
import { technicalSkills } from '../../components/data/technicalSkillsOptions';
import { applicationOptions } from '../../components/data/constants';
import { locations } from '../../components/data/location';
import { SelectField } from '../../components/UI/Form/SelectField';
import { TextArea } from '../../components/UI/Form/TextArea';
import { MultiSelect } from '../../components/UI/Form/MultiSelect';
import { CheckBox } from '../../components/UI/Form/CheckBox';
import { DatePicker } from '../../components/UI/Form/DatePicker';
import IntlMessages from '../../utils/IntlMessages';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
import { collection, serverTimestamp, doc } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../../firebase/clientApp';

export default function AddRole() {
  const defaultValues = {
    title: '',
    department: '',
    qualification: '',
    salary: '',
    description: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: false,
    deadline: null,
    startDate: null,
    coverLetter: false,
    prescreening: false,
    rolesOfInterests: null,
    behaviourAttributesStrengths: null,
    technicalSkills: null,
    technicalSkillsOther: '',
  };

  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(rolesSchema),
  });

  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const technicalSkillsOther = watch('technicalSkills');

  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'roles')
  );

  const updatedRoledMutation = useFirestoreDocumentMutation(
    doc(firestore, `config/roles`),
    { merge: true }
  );

  const handleAddRole = (data) => {
    const date = { createdAt: serverTimestamp(), updatedAt: serverTimestamp() };

    // TODO: update to add jobValues when creating roles.
    const newData = {
      ...data,
      ...date,
      // jobValues,
      // industry,
      // logoUrl,
      companyId: '441vhNMBmyJEXvSfnIr7',
    };

    const roleLastUpdate = { lastUpdated: serverTimestamp() };
    console.log('SUBMIT: ', newData);
    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Added!', 'New Role Added.', 'success');
      },
      onError() {
        Swal.fire('Oops!', 'Failed to Add Role.', 'error');
      },
      onMutate() {
        console.info('Adding document...');
      },
    });
    updatedRoledMutation.mutate(roleLastUpdate);
    reset(defaultValues);
  };

  return (
    <SideBar>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              Add Role
            </h1>
          </div>
          <div className='mt-4 flex sm:mt-0 sm:ml-4'>
            <button
              type='button'
              className='order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0'
            >
              Share
            </button>
            <button
              type='button'
              className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3'
            >
              Create job
            </button>
          </div>
        </div>

        <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
          <section aria-labelledby='payment-details-heading'>
            <form onSubmit={handleSubmit(handleAddRole)}>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='bg-white py-6 px-4 sm:p-6'>
                  <div>
                    <p className='mt-1 text-sm text-gray-500'>
                      Please fill the form below to create a role
                    </p>
                  </div>

                  <div className='mt-6 grid grid-cols-4 gap-x-6 gay-y-2'>
                    <div className='col-span-4 sm:col-span-2'>
                      <TextInput
                        name='title'
                        label='Title'
                        errors={errors.title}
                        control={control}
                        data-cy='role-title-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <SelectField
                        label='Location'
                        name='location'
                        control={control}
                        options={locations}
                        errors={errors.location}
                        data-cy='role-location-select'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <TextArea
                        name='description'
                        type='textarea'
                        label='Description'
                        errors={errors.description}
                        control={control}
                        rows={5}
                        data-cy='role-description-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <TextArea
                        name='qualification'
                        type='textarea'
                        label='Required Qualifications'
                        errors={errors.qualification}
                        control={control}
                        rows={5}
                        data-cy='role-qualification-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <TextInput
                        name='salary'
                        label='Salary'
                        errors={errors.salary}
                        control={control}
                        data-cy='role-salary-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-1'>
                      <SelectField
                        label='Position Type'
                        name='positionType'
                        control={control}
                        options={positionTypes}
                        errors={errors.positionType}
                        data-cy='role-positionType-select'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-1'>
                      <TextInput
                        name='department'
                        label='Department'
                        errors={errors.department}
                        control={control}
                        data-cy='role-department-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <SelectField
                        label='How to Apply'
                        name='howToApply'
                        control={control}
                        options={applicationOptions}
                        errors={errors.howToApply}
                        data-cy='role-howToApply-select'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      {howToApply === 'Email to Hiring Manager' && (
                        <TextInput
                          name='email'
                          label='Hiring Manager Email'
                          control={control}
                          errors={errors.email}
                          data-cy='role-email-input'
                        />
                      )}
                      {howToApply === 'Apply on website' && (
                        <TextInput
                          name='website'
                          label='Website'
                          control={control}
                          errors={errors.website}
                          data-cy='role-website-input'
                        />
                      )}
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <CheckBox
                        name='rolling'
                        label='rolling'
                        control={control}
                        data-cy='role-rolling-checkbox'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      {!rolling && (
                        <DatePicker
                          label='Deadline Date'
                          name='deadline'
                          control={control}
                          errors={errors.deadline}
                          data-cy='role-deadline-datepicker'
                        />
                      )}
                    </div>

                    <div className='col-span-4 sm:col-span-4'>
                      <DatePicker
                        label='Start Date'
                        name='startDate'
                        control={control}
                        errors={errors.startDate}
                        data-cy='role-startDate-datepicker'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-4'>
                      <MultiSelect
                        label='Roles of Interests'
                        name='rolesOfInterests'
                        control={control}
                        options={rolesOfInterests}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        errors={errors.rolesOfInterests}
                        closeMenuOnSelect={false}
                        data-cy='role-rolesOfInterests-multiselect'
                      />
                    </div>
                    <div className='col-span-4 sm:col-span-4'>
                      <MultiSelect
                        label='Behaviour/Attributes/Strengths'
                        name='behaviourAttributesStrengths'
                        control={control}
                        options={behaviourOptions}
                        setValue={setValue}
                        errors={errors.behaviourAttributesStrengths}
                        clearErrors={clearErrors}
                        closeMenuOnSelect={false}
                        data-cy='role-behaviourAttributesStrengths-multiselect'
                      />
                    </div>
                    <div className='col-span-4 sm:col-span-4'>
                      <MultiSelect
                        label='Technical Skills'
                        name='technicalSkills'
                        control={control}
                        options={technicalSkills}
                        setValue={setValue}
                        clearErrors={clearErrors}
                        errors={errors.technicalSkills}
                        closeMenuOnSelect={false}
                        data-cy='role-technicalSkills-multiselect'
                      />
                    </div>
                    <div className='col-span-4 sm:col-span-4'>
                      {technicalSkillsOther !== null &&
                        technicalSkillsOther.includes('Other') && (
                          <TextInput
                            name='technicalSkillsOther'
                            label='Other Technical Skills'
                            control={control}
                            errors={errors.technicalSkillsOther}
                          />
                        )}
                    </div>
                    <div className='col-span-4 sm:col-span-4'>
                      {' '}
                      <CheckBox
                        name='prescreening'
                        label='Requires prescreening'
                        control={control}
                        data-cy='role-prescreening-checkbox'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-4'>
                      {' '}
                      <CheckBox
                        name='CoverLetter'
                        label='Cover Letter Required'
                        control={control}
                        data-cy='role-coverletter-checkbox'
                      />
                    </div>
                  </div>
                </div>
                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    type='submit'
                    className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                  >
                    <IntlMessages id='general.submit' />
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </SideBar>
  );
}
