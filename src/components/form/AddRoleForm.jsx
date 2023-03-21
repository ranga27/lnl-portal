import { Fragment } from 'react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../components/UI/Form/Input';
import { rolesSchema } from '../../components/schemas/rolesSchema';
import { positionTypes } from '../../components/data/positionTypes';
import getOptions, {
  rolesOfInterests,
} from '../../components/data/rolesOfInterests';
import { technicalSkills } from '../../components/data/technicalSkillsOptions';
import { locations } from '../../components/data/location';
import { SelectField } from '../../components/UI/Form/SelectField';
import { TextArea } from '../../components/UI/Form/TextArea';
import { MultiSelect } from '../../components/UI/Form/MultiSelect';
import { CheckBox } from '../../components/UI/Form/CheckBox';
import { DatePicker } from '../../components/UI/Form/DatePicker';
import IntlMessages from '../../utils/IntlMessages';
import 'react-datepicker/dist/react-datepicker.css';
import { areaOfInterestOptions } from '../data/areaOfInterest';

function AddRoleForm({
  handleChangeTab,
  handleSaveFields,
  fields,
  companyName,
}) 
  {
const [deadline, setDeadline] = useState(
  fields.deadline ? new Date(fields.deadline) : null
);
const onFlexibleChange = (e) => {
  setValue('flexible', e.target.checked);
};

const onAsapChange = (e) => {
  setValue('asap', e.target.checked);
};

  const defaultValues = {
    flexible: fields.rolling || false,
    asap: fields.asap || false,
    title: fields.title || '',
    locationType: fields.locationType || '',
    location: fields.location || '',
    department: fields.department || '',
    positionType: fields.positionType || '',
    salary: fields.salary || '',
    description: fields.description || '',
    customMessage: fields.customMessage || '',
    website: fields.website || '',
    rolling: fields.rolling || false,
    deadline: fields.deadline || null,
    startDate: fields.startDate || null,
    rolesOfInterests: fields.rolesOfInterests || null,
    technicalSkills: fields.technicalSkills || null,
    technicalSkillsOther: fields.technicalSkillsOther || '',
    areaOfInterests: fields.areaOfInterests || null,
  };

  const {
    watch,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(rolesSchema),
  });

  const locationType = watch('locationType');
  const rolling = watch('rolling');
  const flexible = watch('flexible');
  const asap = watch('asap')
  const technicalSkillsOther = watch('technicalSkills');
  const roleTitle = watch('title');
  const customMessageValue = watch('customMessage');

  const onSubmit = async (data) => {
    handleSaveFields(data);
    handleChangeTab('tab2');
  };

  const rolesOfInterestCheck = watch('areaOfInterests');
  const areasOfInterests =
    control._formValues.areaOfInterests === undefined ||
    control._formValues.areaOfInterests === null
      ? []
      : Array.isArray(control._formValues.areaOfInterests)
      ? control._formValues.areaOfInterests.map((interest) => {
          return getOptions(interest);
        })
      : getOptions(control._formValues.areaOfInterests);

  const selectAreaOfInterest =
    areasOfInterests === undefined ? [] : areasOfInterests.flatMap((x) => x);
  
    const onRollingChange = (e) => {
      setValue('rolling', e.target.checked);
      if (e.target.checked) {
        const today = new Date();
        const deadlineDate = new Date(today.setDate(today.getDate() + 60));
        setDeadline(deadlineDate.toISOString());
      } else {
        setDeadline(null);
      }
    };

    const onSubmitWithDeadline = (data) => {
      const deadline = data.rolling ? addDays(new Date(), 60) : data.deadline;
      data.deadline = deadline;
      onSubmit(data);
    };

    function addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }


  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmitWithDeadline)} method='Post'>
        <div className='bg-white py-6 px-4 sm:p-6'>
          <div className='grid grid-cols-4 gap-x-6 gay-y-2'>
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
                label='Location Type'
                name='locationType'
                control={control}
                options={locations}
                errors={errors.locationType}
                data-cy='role-locationType-select'
              />
            </div>
            <div className='col-span-4 sm:col-span-2'>
              {locationType !== 'Remote' && (
                <TextInput
                  name='location'
                  label='Location'
                  control={control}
                  errors={errors.location}
                  data-cy='role-location-input'
                />
              )}
            </div>
            <div className='col-span-8 sm:col-span-4'>
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
              <TextInput
                name='salary'
                label='Salary'
                errors={errors.salary}
                control={control}
                data-cy='role-salary-input'
              />
            </div>
            <div className='col-span-4 sm:col-span-2'>
              <SelectField
                label='Position Type'
                name='positionType'
                control={control}
                options={positionTypes}
                errors={errors.positionType}
                data-cy='role-positionType-select'
              />
            </div>
            <div className='col-span-4 sm:col-span-2'>
              <TextInput
                name='department'
                label='Department'
                errors={errors.department}
                control={control}
                data-cy='role-department-input'
              />
            </div>
            <div className='col-span-4 sm:col-span-2'>
            </div>
            <div className='col-span-4 sm:col-span-4'>
              <div>
                <div>
                  <div className='flex items-center mt-5'>
                    <TextInput 
                      name='customMessage'
                      label='Custom Acceptance Message'
                      control={control}
                      errors={errors.customMessage}
                      data-cy='role-customMessage-input'
                      style={{width:'363%'}}
                    />
                    <div className='tooltip'>
                      <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} stroke="currentColor" 
                      className="w-6 h-5 ml-8 mb-7"
                      >
                        <path strokeLinecap="round"
                          strokeLinejoin="round" 
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" 
                          />
                      </svg>
                      <span className="tooltiptext"> &apos;Here you can customise the message accepted candidates receive with details as to the next steps of your recruitment process. E.G We will be in contact within 5 working days to arrange a telephone interview.&apos; You can also paste in URL links for candidates to book meetings or complete additional applications.  </span>
                    </div>
                  </div>
                </div>
              <div className='pt-6 mt-3'>
                  <p>
                    Dear [candidate name],
                    <br /> <br />
                    Congratulations! You have been invited to the next stage for
                    the{' '}
                    <span className='font-bold'>
                      {roleTitle ? roleTitle : '[role name]'}
                    </span>{' '}
                    at{' '}
                    <span className='font-bold'>
                      {companyName ? companyName : '[Company Name]'}.
                    </span>{' '}
                    <br />
                    <span className='font-bold'>
                      {customMessageValue
                        ? customMessageValue
                        : ' [custom message]'}
                    </span>{' '}
                    <br /> <br />
                    Best,
                    <br />
                    Loop Not Luck Team
                  </p>
                </div>
              </div>
            </div>
            <div className='col-span-4 sm:col-span-4 mt-5'>
              {!flexible && !rolling && !asap ? (
                <DatePicker
                label='Deadline Date'
                name='deadline'
                control={control}
                errors={errors.deadline}
                data-cy='role-deadline-datepicker'
                />
                ): null
              }
              <div className='col-span-4 sm:col-span-2 mt-3 mb-3'>
                <CheckBox
                  name='rolling'
                  label='Application Deadline Date - Rolling'
                  control={control}
                  data-cy='role-rolling-checkbox'
                  checked={defaultValues.rolling}
                  onChange={onRollingChange}
                />
              </div>
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
            <div className="flex flex-col">
            <div className='col-span-4 sm:col-span-2'>
              <CheckBox
                name='asap'
                label='Role Start Date - ASAP'
                control={control}
                data-cy='role-asap-checkbox'
                checked={defaultValues.asap}
                onChange={onAsapChange}
              />
              </div>
              <div className='col-span-4 sm:col-span-2'>
              <CheckBox
                name='flexible'
                label='Role Start Date - Flexible'
                control={control}
                data-cy='role-flexible-checkbox'
                checked={defaultValues.flexible}
                onChange={onFlexibleChange}
                />
              </div>
            </div> 
            <div className='col-span-4 sm:col-span-4 mt-5'>
              <MultiSelect
                label='Areas of Interests'
                name='areaOfInterests'
                control={control}
                options={areaOfInterestOptions}
                setValue={setValue}
                clearErrors={clearErrors}
                errors={errors.areaOfInterests}
                defaultValue={defaultValues.areaOfInterests}
                closeMenuOnSelect={false}
                data-cy='role-areaOfInterests-multiselect'
                menuPortalTarget={document.querySelector('body')}
              />
            </div>
            {rolesOfInterestCheck !== null && (
              <div className='col-span-4 sm:col-span-4'>
                <MultiSelect
                  label='Roles of Interests'
                  name='rolesOfInterests'
                  control={control}
                  options={selectAreaOfInterest}
                  setValue={setValue}
                  clearErrors={clearErrors}
                  errors={errors.rolesOfInterests}
                  defaultValue={defaultValues.rolesOfInterests}
                  closeMenuOnSelect={false}
                  data-cy='role-rolesOfInterests-multiselect'
                  menuPortalTarget={document.querySelector('body')}
                />
              </div>
            )}
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
                defaultValue={defaultValues.technicalSkills}
                menuPortalTarget={document.querySelector('body')}
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
export default AddRoleForm;




