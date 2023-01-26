import React from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import IntlMessages from '../../utils/IntlMessages';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormikReactSelect } from '../../components/UI/Form/FormikReactSelect';
import { diversityTypes } from '../../components/data/diversity';
import { visaRequiredOptions } from '../../components/data/visaRequiredOptions';
import { jobValuesOptions } from '../../components/data/jobValuesOptions';
import Button from '../../components/UI/Form/Button';
import { uploadFile } from '../../utils/uploadFile';
import useDocumentMutation from '../../components/hooks/useDocumentMutation';
import useCollectionMutation from '../../components/hooks/useCollectionMutation';
import { v4 as uuidv4 } from 'uuid';
import { interestOptions } from '../../components/data/interestOptions';
import { hearAbout } from '../../components/data/hearAbout';

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
  hearAbout: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
  logoUrl: Yup.mixed()
    .required('You need to provide a file')
    .test(
      'fileSize',
      'File Size is too large',
      (value) => value && value?.size <= 5000000
    )
    .test('fileFormat', 'Unsupported File Format', (value) =>
      SUPPORTED_FORMATS.includes(value && value?.type)
    ),
});

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? '1px solid #F7B919'
      : '1px solid rgb(209 213 219)',
    boxShadow: state.isFocused ? '0px 0px 0px rgb(209 213 219)' : 'none',
    '&:hover': {},
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: 'rgb(156 163 175)',
    };
  },
};

export default function Step2({ nextStep, previousStep, userId, company }) {
  const renderError = (message) => (
    <p className='text-sm pt-1 text-red-600'>{message}</p>
  );
  const uid = uuidv4();
  const { mutateDocument } = useDocumentMutation(
    'companyV2',
    company?.id || 'noId'
  );
  const { mutateCollection } = useCollectionMutation('companyV2');

  const handleSave = async (values) => {
    const {
      ats,
      companyLocation,
      companyName,
      companyValues,
      description,
      diversity,
      hearAbout,
      industry,
      visa,
      logoUrl,
    } = values;

    if (logoUrl) {
      const newLogoUrl = await uploadFile(logoUrl, uid, 'companyLogos');
      logoUrl = newLogoUrl;
    }

    if (company?.userId === userId) {
      mutateDocument({
        ats,
        companyLocation,
        companyName,
        companyValues,
        description,
        diversity,
        hearAbout,
        industry,
        visa,
        logoUrl,
      });
    } else {
      mutateCollection({
        ats,
        companyLocation,
        inviteCredits: 1000000,
        companyName,
        companyValues,
        description,
        diversity,
        hearAbout,
        industry,
        visa,
        userId,
        logoUrl,
      });
    }
  };
  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
        <IntlMessages id='onboarding.companyHeader' />
      </h2>
      <Formik
        initialValues={{
          companyName: company?.companyName || '',
          visa: company?.visa || '',
          companyLocation: company?.companyLocation || '',
          companyValues: company?.companyValues || null,
          description: company?.description || '',
          logoUrl: company?.logoUrl || '',
          industry: company?.industry || null,
          hearAbout: company?.hearAbout || '',
          ats: company?.ats || '',
          diversity: company?.diversity || null,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handleSave(values);
          nextStep();
          window.scrollTo(0, 0);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-2'>
              <div className='col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.companyName' />
                </label>
                <Field
                  name='companyName'
                  placeholder='Doe limited'
                  variant='outlined'
                  data-cy='onboarding-companyName-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500':
                        errors.companyName && touched.companyName,
                    }
                  )}
                />
                <ErrorMessage name='companyName' render={renderError} />
              </div>

              <div className='col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.companyLocation' />
                </label>
                <Field
                  name='companyLocation'
                  placeholder='Company Location'
                  variant='outlined'
                  data-cy='onboarding-companyLocation-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500':
                        errors.companyLocation && touched.companyLocation,
                    }
                  )}
                />
                <ErrorMessage name='companyLocation' render={renderError} />
              </div>

              <div className='mt-8 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.industry' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.industry && touched.industry,
                  })}
                  name='industry'
                  onChange={(e) => {
                    setFieldValue(
                      'industry',
                      e.map((option) => option.value)
                    );
                  }}
                  styles={customStyles}
                  options={interestOptions}
                  isMulti={true}
                />
                <ErrorMessage name='industry' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.diversity' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.diversity && touched.diversity,
                  })}
                  name='diversity'
                  value={values.diversity}
                  onChange={(e) => {
                    setFieldValue(
                      'diversity',
                      e.map((option) => option.value)
                    );
                  }}
                  styles={customStyles}
                  options={diversityTypes}
                  isMulti={true}
                />
                <ErrorMessage name='diversity' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.visa' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.visa && touched.visa,
                  })}
                  name='visa'
                  value={values.visa}
                  onChange={(value) => setFieldValue('visa', value.value)}
                  styles={customStyles}
                  options={visaRequiredOptions}
                  isMulti={false}
                />
                <ErrorMessage name='visa' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.values' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500':
                      errors.companyValues && touched.companyValues,
                  })}
                  name='companyValues'
                  value={values.companyValues}
                  onChange={(e) => {
                    setFieldValue(
                      'companyValues',
                      e.map((option) => option.value)
                    );
                  }}
                  styles={customStyles}
                  options={jobValuesOptions}
                  isMulti={true}
                />
                <ErrorMessage name='companyValues' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.description' />
                </label>
                <Field
                  name='description'
                  placeholder='Doe limited is a ...'
                  variant='outlined'
                  rows='4'
                  component={'textarea'}
                  data-cy='onboarding-description-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500':
                        errors.description && touched.description,
                    }
                  )}
                />
                <ErrorMessage name='description' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.companyLogo' />
                </label>
                <div className='flex w-full items-center justify-center bg-grey-lighter'>
                  <label className='w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-sm tracking-wide border border-blue cursor-pointer hover:bg-[#F7B919] hover:text-white'>
                    <svg
                      className='w-8 h-8'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
                    </svg>
                    <span className='mt-2 text-sm leading-normal'>
                      Select a file
                    </span>
                    <input
                      type='file'
                      name='logoUrl'
                      id='logoUrl'
                      className='hidden'
                      onChange={(event) => {
                        setFieldValue('logoUrl', event.currentTarget.files[0]);
                      }}
                    />
                  </label>
                </div>

                {values && values.logoUrl && (
                  <div className='company-img-container'>
                    <p className='text-sm italic'>Image uploaded</p>
                  </div>
                )}
                <ErrorMessage name='logoUrl' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.ats' />
                </label>
                <Field
                  name='ats'
                  placeholder='https://www.linkedin.com/in/doe'
                  data-cy='onboarding-ats-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none'
                  )}
                />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.hearAbout' />
                </label>
                {/* <Field
                  name='hearAbout'
                  placeholder='LinkedIn'
                  data-cy='onboarding-hearAbout-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500': errors.hearAbout && touched.hearAbout,
                    }
                  )}
                /> */}
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.hearAbout && touched.hearAbout,
                  })}
                  name='hearAbout'
                  onChange={(e) => {
                    setFieldValue(
                      'hearAbout',
                      e.map((option) => option.value)
                    );
                  }}
                  styles={customStyles}
                  options={hearAbout}
                  isMulti={true}
                  data-cy='onboarding-hearAbout-input'
                />
                <ErrorMessage name='hearAbout' render={renderError} />
              </div>
            </div>

            <div className='my-12 flex flex-row space-x-6'>
              <Button
                onClick={() => {
                  handleSave(values);
                  previousStep();
                }}
                text={'onboarding.backVariant1'}
                type='button'
                width='w-full'
                color='text-black'
                bg='bg-gray-100'
                hover='bg-gray-100'
              />
              <Button
                text={'onboarding.nextVariant2'}
                type='submit'
                width='w-full'
                color='text-white'
                bg='bg-gray-900'
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
