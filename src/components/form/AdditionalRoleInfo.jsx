import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { rolesSchema } from '../../components/schemas/rolesSchema';
import { behaviourOptions } from '../../components/data/behaviourOptions';
import { experience } from '../../components/data/experience';
import { SelectField } from '../../components/UI/Form/SelectField';
import { TextArea } from '../../components/UI/Form/TextArea';
import { MultiSelect } from '../../components/UI/Form/MultiSelect';
import IntlMessages from '../../utils/IntlMessages';

export default function AdditionalRoleInformation() {
  const defaultValues = {
    moreRoleInfo: '',
    behaviourAttributesStrengths: null,
    experience: null,
  };

  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(rolesSchema),
  });

  return (
    <>
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
        <button
          type='submit'
          className='bg-[#F7B919] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[#F7B919] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
        >
          <IntlMessages id='general.submit' />
        </button>
      </div>
    </>
  );
}
