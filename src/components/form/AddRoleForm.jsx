import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInput } from '../../components/UI/Form/Input';
import { rolesSchema } from '../../components/schemas/rolesSchema';
import { positionTypes } from '../../components/data/positionTypes';
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
import 'react-datepicker/dist/react-datepicker.css';

function AddRoleForm({
  handleChangeTab,
  handleSaveFields,
  fields,
  companyName,
}) {
  const defaultValues = {
    title: fields.title || '',
    locationType: fields.locationType || '',
    location: fields.location || '',
    department: fields.department || '',
    positionType: fields.positionType || '',
    salary: fields.salary || '',
    description: fields.description || '',
    howToApply: fields.howToApply || '',
    meetingLink: fields.meetingLink || '',
    website: fields.website || '',
    rolling: fields.rolling || false,
    deadline: fields.deadline || null,
    startDate: fields.startDate || null,
    rolesOfInterests: fields.rolesOfInterests || null,
    technicalSkills: fields.technicalSkills || null,
    technicalSkillsOther: fields.technicalSkillsOther || '',
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
  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const technicalSkillsOther = watch('technicalSkills');
  const roleTitle = watch('title');
  const meetingLinkValue = watch('meetingLink');

  const onSubmit = async (data) => {
    handleSaveFields(data);
    handleChangeTab('tab2');
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                label='Location'
                name='locationType'
                control={control}
                options={locations}
                errors={errors.locationType}
                data-cy='role-location-select'
              />
            </div>
            <div className='col-span-4 sm:col-span-2'>
              {locationType !== 'Remote' && (
                <TextInput
                  name='location'
                  label='Location'
                  control={control}
                  errors={errors.location}
                  data-cy='role-website-input'
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
              <SelectField
                label='How to Apply'
                name='howToApply'
                control={control}
                options={applicationOptions}
                errors={errors.howToApply}
                data-cy='role-howToApply-select'
              />
            </div>
            <div className='col-span-4 sm:col-span-4'>
              {howToApply === 'Email to Hiring Manager' && (
                <>
                  <TextInput
                    name='meetingLink'
                    label='Meeting Link'
                    control={control}
                    errors={errors.meetingLink}
                    data-cy='role-meetingLink-input'
                  />

                  <div className='pt-6'>
                    <p>
                      Hello [candidate name],
                      <br /> <br />
                      Congratulations! You&apos;ve been invited on to the next
                      stage for the position of{' '}
                      <span className='font-bold'>
                        {roleTitle ? roleTitle : '[role name]'}
                      </span>{' '}
                      at{' '}
                      <span className='font-bold'>
                        {companyName ? companyName : '[Company Name]'}.
                      </span>{' '}
                      Please book a meeting with a member of the team here -{' '}
                      <span className='font-bold'>
                        {meetingLinkValue
                          ? meetingLinkValue
                          : ' [meeting link]'}
                      </span>{' '}
                      <br /> <br />
                      Best,
                      <br />
                      Loop Not Luck Team
                    </p>
                  </div>
                </>
              )}
              {howToApply === 'Apply on website' && (
                <TextInput
                  name='website'
                  label='Link to application on website'
                  control={control}
                  errors={errors.website}
                  data-cy='role-website-input'
                />
              )}
            </div>
            <div className='col-span-4 sm:col-span-2'>
              <CheckBox
                name='rolling'
                label='Rolling'
                control={control}
                data-cy='role-rolling-checkbox'
                checked={defaultValues.rolling}
              />
            </div>
            <div className='col-span-4 sm:col-span-4'>
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
                defaultValue={defaultValues.rolesOfInterests}
                closeMenuOnSelect={false}
                data-cy='role-rolesOfInterests-multiselect'
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
