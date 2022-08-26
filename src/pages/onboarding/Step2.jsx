import React from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import IntlMessages from '../../utils/IntlMessages';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { locations } from '../../components/data/location';
import { FormikReactSelect } from '../../components/UI/Form/FormikReactSelect';
import { positionTypes } from '../../components/data/positionTypes';
import { diversityTypes } from '../../components/data/diversity';
import { visaRequiredOptions } from '../../components/data/visaRequiredOptions';
import { jobValuesOptions } from '../../components/data/jobValuesOptions';

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

export default function Step2(props) {
  const renderError = (message) => (
    <p className='text-sm pt-1 text-red-600'>{message}</p>
  );

  return (
    <div className='max-w-5xl'>
      <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
        <IntlMessages id='onboarding.companyHeader' />
      </h2>

      <Formik
        initialValues={{
          companyName: '',
          visa: '',
          companyLocation: '',
          companyValues: [],
          description: '',
          logoUrl: '',
          industry: [],
          hearAbout: '',
          ats: '',
          diversity: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          props.update(values);
          props.nextStep();
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className='mt-6 grid grid-cols-4 gap-x-6 gay-y-2'>
              <div className='col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-900'>
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
                <label className='py-2 block text-sm font-medium text-gray-900'>
                  <IntlMessages id='onboarding.companyLocation' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500':
                      errors.companyLocation && touched.companyLocation,
                  })}
                  name='companyLocation'
                  value={values.companyLocation}
                  onChange={(value) =>
                    setFieldValue('companyLocation', value.value)
                  }
                  styles={customStyles}
                  options={locations}
                  isMulti={false}
                />
                <ErrorMessage name='companyLocation' render={renderError} />
              </div>

              <div className='mt-8 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-900'>
                  <IntlMessages id='onboarding.industry' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.industry && touched.industry,
                  })}
                  name='industry'
                  value={values.industry}
                  onChange={(value) => setFieldValue('industry', value)}
                  styles={customStyles}
                  options={positionTypes}
                  placeholder='London'
                  isMulti={true}
                />
                <ErrorMessage name='industry' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-900'>
                  <IntlMessages id='onboarding.diversity' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.diversity && touched.diversity,
                  })}
                  name='diversity'
                  value={values.diversity}
                  onChange={(value) => setFieldValue('diversity', value)}
                  styles={customStyles}
                  options={diversityTypes}
                  isMulti={true}
                />
                <ErrorMessage name='diversity' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-900'>
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
                <label className='py-2 block text-sm font-medium text-gray-900'>
                  <IntlMessages id='onboarding.values' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500':
                      errors.companyValues && touched.companyValues,
                  })}
                  name='companyValues'
                  value={values.companyValues}
                  onChange={(value) => setFieldValue('companyValues', value)}
                  styles={customStyles}
                  options={jobValuesOptions}
                  isMulti={true}
                />
                <ErrorMessage name='companyValues' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-900'>
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
                <label className='py-2 block text-sm font-medium text-gray-900'>
                  <IntlMessages id='onboarding.companyLogo' />
                </label>
                <div className='flex w-full items-center justify-center bg-grey-lighter'>
                  <label className='w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-sm tracking-wide uppercase border border-blue cursor-pointer hover:bg-[#F7B919] hover:text-white'>
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
                <ErrorMessage name='logoUrl' render={renderError} />
              </div>

              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-900'>
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
                <label className='py-2 block text-sm font-medium text-gray-900'>
                  <IntlMessages id='onboarding.hearAbout' />
                </label>
                <Field
                  name='hearAbout'
                  placeholder='LinkedIn'
                  data-cy='onboarding-hearAbout-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500': errors.hearAbout && touched.hearAbout,
                    }
                  )}
                />
                <ErrorMessage name='hearAbout' render={renderError} />
              </div>
            </div>

            <div className='flex flex-row space-x-6'>
              <button
                className='w-full rounded-md bg-[#F7B919] font-medium text-white my-8  p-2'
                type='button'
                onClick={() => props.previousStep()}
              >
                <IntlMessages id='onboarding.backVariant1' />
              </button>
              <button
                className='w-full rounded-md bg-[#F7B919] font-medium text-white my-8  p-2'
                type='submit'
              >
                <IntlMessages id='onboarding.nextVariant1' />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
