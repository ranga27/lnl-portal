import React from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import IntlMessages from '../../utils/IntlMessages';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { locations } from '../../components/data/location';
import { FormikReactSelect } from '../../components/UI/Form/FormikReactSelect';
import Button from '../../components/UI/Form/Button';

const phoneRegExp = /^[0-9,+,(), ,]{1,}(,[0-9]+){0,}$/;

const validationSchema = Yup.object().shape({
  mobileNumber: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required')
    .min(4, 'Phone Number is too short - should be 4 chars minimum'),
  jobRole: Yup.string().required('Job Role is required'),
  location: Yup.string().required('Location is required'),
  linkedinUrl: Yup.string().required('LinkedIn url is required'),
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

export default function Step1(props) {
  const renderError = (message) => (
    <p className='text-sm pt-1 text-red-600'>{message}</p>
  );

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
        <IntlMessages id='onboarding.accountHeader' />
      </h2>

      <Formik
        initialValues={{
          mobileNumber: '',
          jobRole: '',
          location: '',
          linkedinUrl: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          props.update(values);
          props.nextStep();
          window.scrollTo(0, 0);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-2'>
              <div className='col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.mobileNumber' />
                </label>
                <Field
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500':
                        errors.mobileNumber && touched.mobileNumber,
                    }
                  )}
                  name='mobileNumber'
                  placeholder='+000 392 101'
                  data-cy='onboarding-mobileNumber-input'
                />
                <ErrorMessage name='mobileNumber' render={renderError} />
              </div>

              <div className='col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.jobRole' />
                </label>
                <Field
                  name='jobRole'
                  placeholder='Human Resources'
                  data-cy='onboarding-jobRole-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500': errors.jobRole && touched.jobRole,
                    }
                  )}
                />
                <ErrorMessage name='jobRole' render={renderError} />
              </div>
              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.location' />
                </label>
                <FormikReactSelect
                  className={classnames('', {
                    'border-red-500': errors.location && touched.location,
                  })}
                  name='location'
                  value={values.location}
                  onChange={(value) => setFieldValue('location', value.value)}
                  styles={customStyles}
                  placeholder='London'
                  options={locations}
                  isMulti={false}
                />
                <ErrorMessage name='location' render={renderError} />
              </div>
              <div className='mt-4 col-span-4 sm:col-span-2'>
                <label className='py-2 block text-sm font-medium text-gray-700'>
                  <IntlMessages id='onboarding.linkedinUrl' />
                </label>
                <Field
                  name='linkedinUrl'
                  placeholder='https://www.linkedin.com/in/doe'
                  data-cy='onboarding-linkedinUrl-input'
                  className={classnames(
                    'form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#F7B919] focus:outline-none',
                    {
                      'border-red-500':
                        errors.linkedinUrl && touched.linkedinUrl,
                    }
                  )}
                />
                <ErrorMessage name='linkedinUrl' render={renderError} />
              </div>
            </div>
            <div className='mt-12'>
              <Button text={'Next'} type='submit' width='w-full' color="text-white" bg="bg-gray-900"/>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
