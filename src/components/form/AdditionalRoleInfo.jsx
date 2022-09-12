import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { behaviourOptions } from '../../components/data/behaviourOptions';
import { experience } from '../../components/data/experience';
import { SelectField } from '../../components/UI/Form/SelectField';
import { TextArea } from '../../components/UI/Form/TextArea';
import { MultiSelect } from '../../components/UI/Form/MultiSelect';
import IntlMessages from '../../utils/IntlMessages';

const validationSchema = Yup.object().shape({
  behaviourAttributesStrengths: Yup.mixed().required(
    'Behaviour/Attributes/Strengths is required'
  ),
  moreRoleInfo: Yup.string()
    .max(2000, 'Information Too Long!')
    .required('Please fill this field'),
  experience: Yup.string().required(
    'Please select the experience required for this role'
  ),
});

export default function AdditionalRoleInformation({
  handleLastTabButton,
  handleSaveFields,
  fields,
}) {
  const defaultValues = {
    moreRoleInfo: fields.moreRoleInfo || '',
    behaviourAttributesStrengths: fields.behaviourAttributesStrengths || null,
    experience: fields.experience || null,
  };

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handleLastTabButton(true);
    handleSaveFields(data);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white py-6 px-4 sm:p-6'>
          <div className='grid grid-cols-4 gap-x-6 gay-y-2'>
            <div className='col-span-4 sm:col-span-4'>
              <SelectField
                label='Experience level'
                name='experience'
                control={control}
                options={experience}
                errors={errors.experience}
                data-cy='role-experience-select'
              />
            </div>
            <div className='col-span-4 sm:col-span-4'>
              <MultiSelect
                label='Select the core skills for the role'
                name='behaviourAttributesStrengths'
                control={control}
                options={behaviourOptions}
                setValue={setValue}
                defaultValue={defaultValues.behaviourAttributesStrengths}
                errors={errors.behaviourAttributesStrengths}
                clearErrors={clearErrors}
                closeMenuOnSelect={false}
                menuPortalTarget={document.querySelector('body')}
                data-cy='role-behaviourAttributesStrengths-multiselect'
              />
            </div>
            <div className='col-span-4 sm:col-span-4'>
              <TextArea
                name='moreRoleInfo'
                type='textarea'
                label='More information about the skills required for this role'
                errors={errors.moreRoleInfo}
                control={control}
                rows={5}
                data-cy='role-moreRoleInfo-input'
              />
            </div>
          </div>
        </div>
        <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
          <button type='submit' className=''>
            <IntlMessages id='general.submit' />
          </button>
        </div>
      </form>
    </Fragment>
  );
}
