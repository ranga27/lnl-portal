/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { RadioGroup, Switch } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
import { serverTimestamp, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { TextInput } from '../../components/UI/Form/Input';
import { MultiSelect } from '../../components/UI/Form/MultiSelect';
import SideBar from '../../components/layout/Sidebar';
import { locations } from '../../components/data/location';
import { SelectField } from '../../components/UI/Form/SelectField';
import { TextArea } from '../../components/UI/Form/TextArea';
import { visaRequiredOptions } from '../../components/data/visaRequiredOptions';
import { positionTypes } from '../../components/data/positionTypes';
import { diversityTypes } from '../../components/data/diversity';
import { jobValuesOptions } from '../../components/data/jobValuesOptions';
import { uploadFile } from '../../utils/uploadFile';

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  companyLocation: Yup.string().required('Company location is required'),
  industry: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
  diversity: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
  companyValues: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
  visa: Yup.string().required('Visa Status is required'),
  description: Yup.string().required('Company description is required'),
  hearAbout: Yup.string().required('This is required'),
  logoFile: Yup.mixed().when('logoUrl', {
    is: (value) => value,
    then: Yup.mixed().notRequired(),
    otherwise: Yup.mixed()
      .required('You need to provide a file')
      .test(
        'fileSize',
        'File Size is too large',
        (value) => value && value?.size <= 5000000
      )
      .test('fileFormat', 'Unsupported File Format', (value) =>
        SUPPORTED_FORMATS.includes(value && value?.type)
      ),
  }),
});

export default function UpdateExternalCompany() {
  const router = useRouter();
  const { ...company } = router.query;

  const defaultValues = {
    ats: company.ats || '',
    tagline: company.tagline || '',
    companyName: company.companyName || '',
    companyValues: company.companyValues || null,
    companyBenefits: company.companyBenefits || null,
    companyMission: company.companyMission || '',
    diversity: company.diversity || null,
    hearAbout: company.hearAbout || '',
    industry: company.industry || null,
    linkedinUrl: company.linkedinUrl || '',
    twitterUrl: company.twitterUrl || '',
    logoUrl: company.logoUrl || '',
    visa: company.visa || '',
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <SideBar>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              External Company Profile
            </h1>
          </div>
        </div>

        {/* Company Form */}
        <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
          <section aria-labelledby='payment-details-heading'>
            <form
            // onSubmit={handleSubmit(handleUpdateCompany)}
            >
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='bg-white py-6 px-4 sm:p-6'>
                  <div>
                    <h2
                      id='payment-details-heading'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Company details
                    </h2>
                    <p className='mt-1 text-sm text-gray-500'>
                      Please fill in the details below to provide applicants
                      with all they need to know about your company.
                    </p>
                  </div>

                  <div className='mt-6 grid grid-cols-4 gap-x-6 gay-y-2'>
                    <div className='col-span-4 sm:col-span-2'>
                      <TextInput
                        name='companyName'
                        label='Company Name'
                        errors={errors.companyName}
                        control={control}
                        // data-cy='company-name-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <TextInput
                        name='tagline'
                        label='Tagline'
                        errors={errors.tagline}
                        control={control}
                        // data-cy='company-name-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextArea
                        name='companyMission'
                        type='textarea'
                        label='Company Mission'
                        errors={errors.companyMission}
                        control={control}
                        rows={5}
                        // data-cy='company-description-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <div className='col-span-4 sm:col-span-2'>
                        <TextInput
                          name='linkedinUrl'
                          label='Linkedin Url'
                          errors={errors.linkedinUrl}
                          control={control}
                          // data-cy='company-linkedinUrl-input'
                        />
                      </div>
                      <div className='col-span-4 sm:col-span-2'>
                        <TextInput
                          name='twitterUrl'
                          label='Twitter Url'
                          errors={errors.twitterUrl}
                          control={control}
                          // data-cy='company-ats-input'
                        />
                      </div>
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <MultiSelect
                        label='Company Values'
                        name='companyValues'
                        control={control}
                        options={jobValuesOptions}
                        errors={errors.companyValues}
                        setValue={setValue}
                        defaultValue={[company.companyValues]}
                        clearErrors={clearErrors}
                        closeMenuOnSelect={false}
                        menuPortalTarget={document.querySelector('body')}
                        // data-cy='company-values-select'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <MultiSelect
                        label='Company Benefits'
                        name='companyBenefits'
                        control={control}
                        options={jobValuesOptions}
                        errors={errors.companyBenefits}
                        setValue={setValue}
                        defaultValue={[company.companyBenefits]}
                        clearErrors={clearErrors}
                        closeMenuOnSelect={false}
                        menuPortalTarget={document.querySelector('body')}
                        // data-cy='company-values-select'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <MultiSelect
                        label='Industry'
                        name='industry'
                        control={control}
                        options={positionTypes}
                        errors={errors.industry}
                        setValue={setValue}
                        defaultValue={[company.industry]}
                        clearErrors={clearErrors}
                        closeMenuOnSelect={false}
                        menuPortalTarget={document.querySelector('body')}
                        // data-cy='company-industry-select'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2 mx-auto'>
                      <img
                        src={company.logoUrl}
                        className='h-48 w-48 pt-12'
                        alt={company.companyName}
                      />
                    </div>
                  </div>
                </div>

                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    type='submit'
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
    </SideBar>
  );
}
