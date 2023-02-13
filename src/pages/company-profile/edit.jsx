/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
import { serverTimestamp, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { TextInput } from '../../components/UI/Form/Input';
import { MultiSelect } from '../../components/UI/Form/MultiSelect';
import SideBar from '../../components/layout/Sidebar';
import { locations } from '../../components/data/locationBackup';
import { SelectField } from '../../components/UI/Form/SelectField';
import { TextArea } from '../../components/UI/Form/TextArea';
import { visaRequiredOptions } from '../../components/data/visaRequiredOptions';
import { positionTypes } from '../../components/data/positionTypes';
import { diversityTypes } from '../../components/data/diversity';
import { jobValuesOptions } from '../../components/data/jobValuesOptions';
import { uploadFile } from '../../utils/uploadFile';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

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

export default function UpdateCompany() {
  const router = useRouter();
  const { ...company } = router.query;

  const defaultValues = {
    ats: company.ats || '',
    companyLocation: company.companyLocation || '',
    companyName: company.companyName || '',
    companyValues: company.companyValues || null,
    description: company.description || '',
    diversity: company.diversity || null,
    hearAbout: company.hearAbout || '',
    industry: company.industry || null,
    linkedinUrl: company.linkedinUrl || '',
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

  const companyRef = doc(firestore, 'companyV2', company.id);
  const companyMutation = useFirestoreDocumentMutation(companyRef, {
    merge: true,
  });

  const handleUpdateCompany = async (data) => {
    const { logoUrl, ...rest } = data;

    if (logoUrl.lastModified) {
      const newLogoUrl = await uploadFile(
        logoUrl,
        data.companyName,
        'companyLogos'
      );
      logoUrl = newLogoUrl;
    }

    const newData = {
      logoUrl,
      ...rest,
      updatedAt: serverTimestamp(),
    };

    companyMutation.mutate(newData, {
      onSuccess() {
        Swal.fire({
          title: 'Success!',
          text: 'Company Profile Updated.',
          icon: 'success',
          iconColor: '#3085d6',
          showConfirmButton: false,
        });
        window.setTimeout(() => {
          router.push('/company-profile');
        }, 2000);
      },
      onError() {
        Swal.fire('Oops!', 'Failed to Update Company Profile.', 'error');
      },
      onMutate() {
        console.info('updating...');
      },
    });
  };

  return (
    <SideBar>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              Company Profile
            </h1>
          </div>
        </div>

        {/* Company Form */}
        <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
          <section aria-labelledby='payment-details-heading'>
            <form onSubmit={handleSubmit(handleUpdateCompany)}>
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
                        data-cy='company-name-input'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2'>
                      <SelectField
                        label='Location'
                        name='companyLocation'
                        control={control}
                        options={locations}
                        errors={errors.companyLocation}
                        data-cy='company-location-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextArea
                        name='description'
                        type='textarea'
                        label='About your company'
                        errors={errors.description}
                        control={control}
                        rows={5}
                        data-cy='company-description-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-1'>
                      <SelectField
                        label='Are you able to sponsor work visas for candidates?'
                        name='visa'
                        control={control}
                        defaultValue={defaultValues.visa}
                        options={visaRequiredOptions}
                        data-cy='company-visa-select'
                        menuPortalTarget={document.querySelector('body')}
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-1'>
                      <TextInput
                        name='ats'
                        label='Do you use an ATS (Applicant tracking system) If yes, type below'
                        errors={errors.ats}
                        control={control}
                        data-cy='company-ats-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextInput
                        name='linkedinUrl'
                        label='Linkedin Url'
                        errors={errors.linkedinUrl}
                        control={control}
                        data-cy='company-linkedinUrl-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextInput
                        name='hearAbout'
                        label='How did you hear about us?'
                        errors={errors.hearAbout}
                        control={control}
                        data-cy='company-hearAbout-input'
                      />
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
                        data-cy='company-values-select'
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
                        data-cy='company-industry-select'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-4'>
                      <MultiSelect
                        label='Which of these underrepresented groups are your company interested in reaching?(Select all that apply)'
                        name='diversity'
                        control={control}
                        options={diversityTypes}
                        errors={errors.diversity}
                        setValue={setValue}
                        defaultValue={[company.diversity]}
                        clearErrors={clearErrors}
                        closeMenuOnSelect={false}
                        menuPortalTarget={document.querySelector('body')}
                        data-cy='company-diversity-select'
                      />
                    </div>

                    <div className='col-span-4 sm:col-span-2 mx-auto'>
                      <img
                        src={company.logoUrl}
                        className='h-48 w-48 pt-12'
                        alt={company.companyName}
                      />
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
                              htmlFor='logoUrl'
                              className='relative cursor-pointer bg-white rounded-md font-medium text-[#F7B919] hover:text-[#F7B919] focus-within:outline-none focus-within:ring-none'
                            >
                              <span>Upload a file</span>

                              <div>
                                <input
                                  type='file'
                                  name='logoFile'
                                  id='logoUrl'
                                  onChange={(event) => {
                                    setValue(
                                      'logoUrl',
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
