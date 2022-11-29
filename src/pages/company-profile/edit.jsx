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

const plans = [
  {
    name: 'Startup',
    priceMonthly: 29,
    priceYearly: 290,
    limit: 'Up to 5 active job postings',
  },
  {
    name: 'Business',
    priceMonthly: 99,
    priceYearly: 990,
    limit: 'Up to 25 active job postings',
  },
  {
    name: 'Enterprise',
    priceMonthly: 249,
    priceYearly: 2490,
    limit: 'Unlimited active job postings',
  },
];
const payments = [
  {
    id: 1,
    date: '1/1/2020',
    datetime: '2020-01-01',
    description: 'Business Plan - Annual Billing',
    amount: 'CA$109.00',
    href: '#',
  },
  // More payments...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
  const [selectedPlan, setSelectedPlan] = useState(plans[1]);
  const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);
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
      ...data,
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

                    {/* //TODO: Need to fix this */}
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

                    {/* //TODO: Need to fix this */}
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

                    {/* //TODO: Need to fix this */}
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

          {/* Plan */}
          <section aria-labelledby='plan-heading'>
            <form action='#' method='POST'>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
                  <div>
                    <h2
                      id='plan-heading'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Plan
                    </h2>
                  </div>

                  <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                    <RadioGroup.Label className='sr-only'>
                      Pricing plans
                    </RadioGroup.Label>
                    <div className='relative bg-white rounded-md -space-y-px'>
                      {plans.map((plan, planIdx) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan}
                          className={({ checked }) =>
                            classNames(
                              planIdx === 0
                                ? 'rounded-tl-md rounded-tr-md'
                                : '',
                              planIdx === plans.length - 1
                                ? 'rounded-bl-md rounded-br-md'
                                : '',
                              checked
                                ? 'bg-orange-50 border-orange-200 z-10'
                                : 'border-gray-200',
                              'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className='flex items-center text-sm'>
                                <span
                                  className={classNames(
                                    checked
                                      ? 'bg-orange-500 border-transparent'
                                      : 'bg-white border-gray-300',
                                    active
                                      ? 'ring-2 ring-offset-2 ring-gray-900'
                                      : '',
                                    'h-4 w-4 rounded-full border flex items-center justify-center'
                                  )}
                                  aria-hidden='true'
                                >
                                  <span className='rounded-full bg-white w-1.5 h-1.5' />
                                </span>
                                <RadioGroup.Label
                                  as='span'
                                  className='ml-3 font-medium text-gray-900'
                                >
                                  {plan.name}
                                </RadioGroup.Label>
                              </div>
                              <RadioGroup.Description className='ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center'>
                                <span
                                  className={classNames(
                                    checked
                                      ? 'text-orange-900'
                                      : 'text-gray-900',
                                    'font-medium'
                                  )}
                                >
                                  ${plan.priceMonthly} / mo
                                </span>{' '}
                                <span
                                  className={
                                    checked
                                      ? 'text-orange-700'
                                      : 'text-gray-500'
                                  }
                                >
                                  (${plan.priceYearly} / yr)
                                </span>
                              </RadioGroup.Description>
                              <RadioGroup.Description
                                className={classNames(
                                  checked ? 'text-orange-700' : 'text-gray-500',
                                  'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                                )}
                              >
                                {plan.limit}
                              </RadioGroup.Description>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>

                  <Switch.Group as='div' className='flex items-center'>
                    <Switch
                      checked={annualBillingEnabled}
                      onChange={setAnnualBillingEnabled}
                      className={classNames(
                        annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors ease-in-out duration-200'
                      )}
                    >
                      <span
                        aria-hidden='true'
                        className={classNames(
                          annualBillingEnabled
                            ? 'translate-x-5'
                            : 'translate-x-0',
                          'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                        )}
                      />
                    </Switch>
                    <Switch.Label as='span' className='ml-3'>
                      <span className='text-sm font-medium text-gray-900'>
                        Annual billing{' '}
                      </span>
                      <span className='text-sm text-gray-500'>(Save 10%)</span>
                    </Switch.Label>
                  </Switch.Group>
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

          {/* Billing history */}
          <section aria-labelledby='billing-history-heading'>
            <div className='bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden'>
              <div className='px-4 sm:px-6'>
                <h2
                  id='billing-history-heading'
                  className='text-lg leading-6 font-medium text-gray-900'
                >
                  Billing history
                </h2>
              </div>
              <div className='mt-6 flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                    <div className='overflow-hidden border-t border-gray-200'>
                      <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                          <tr>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'
                            >
                              Date
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'
                            >
                              Description
                            </th>
                            <th
                              scope='col'
                              className='px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'
                            >
                              Amount
                            </th>
                            {/*
                                `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                              */}
                            <th
                              scope='col'
                              className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider'
                            >
                              <span className='sr-only'>View receipt</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                          {payments.map((payment) => (
                            <tr key={payment.id}>
                              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                                <time dateTime={payment.datetime}>
                                  {payment.date}
                                </time>
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                {payment.description}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                {payment.amount}
                              </td>
                              <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                <a
                                  href={payment.href}
                                  className='text-orange-600 hover:text-orange-900'
                                >
                                  View receipt
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </SideBar>
  );
}
