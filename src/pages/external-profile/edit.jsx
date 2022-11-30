/* eslint-disable @next/next/no-img-element */
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
import { TextArea } from '../../components/UI/Form/TextArea';
import { jobValuesOptions } from '../../components/data/jobValuesOptions';
import { jobBenefitsOptions } from '../../components/data/jobBenefitsOptions';
import { numberOfEmployeesOptions } from '../../components/data/numberOfEmployeesOptions';
import { ratingsOptions } from '../../components/data/ratingsOptions';
import { RadioGroup } from '../../components/UI/Form/RadioGroup';
import { CheckBoxGroup } from '../../components/UI/Form/CheckBoxGroup';

// TODO: Put regex for various url inputs
const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company name is required'),
  tagline: Yup.string(),
  companyMission: Yup.string(),
  numberOfEmployees: Yup.string().required('Select one of the options'),
  ratings: Yup.array(),
  companyValues: Yup.array()
    .required('Select at least one option')
    .min(1, 'Select at least one option'),
  companyBenefits: Yup.array().nullable(),
  commitmentToDiversity: Yup.string(),
  diversityAnnouncement: Yup.string(),
  interestingStats: Yup.string(),
  articles: Yup.string(),
  linkedinUrl: Yup.string(),
  twitterUrl: Yup.string(),
  websiteUrl: Yup.string(),
  careerPageUrl: Yup.string(),
});

export default function UpdateExternalCompany() {
  const router = useRouter();
  const { ...company } = router.query;

  const defaultValues = {
    companyName: company.companyName || '',
    tagline: company.tagline || '',
    companyMission: company.companyMission || '',
    numberOfEmployees: company.numberOfEmployees || '',
    ratings: company.ratings || [],
    companyValues: company.companyValues || null,
    companyBenefits: company.companyBenefits || null,
    commitmentToDiversity: company.commitmentToDiversity || '',
    diversityAnnouncement: company.diversityAnnouncement || '',
    interestingStats: company.interestingStats?.join('\n') || null,
    articles: company.articles?.join('\n') || null,
    linkedinUrl: company.linkedinUrl || '',
    twitterUrl: company.twitterUrl || '',
    websiteUrl: company.websiteUrl || '',
    careerPageUrl: company.careerPageUrl || '',
    logoUrl: company.logoUrl || '',
  };

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
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

  const handleUpdateExternalCompany = async (data) => {
    // Create array of news/article links & interesting stats
    data.articles = data.articles.split('\n');
    data.interestingStats = data.interestingStats.split('\n');

    // Modify ratings array
    data.ratings = data.ratings.map((rating) => {
      return {
        name: rating,
        rating: 5, // Static for now
        showRatings: true,
      };
    });

    const newData = {
      ...data,
      updatedAt: serverTimestamp(),
    };

    companyMutation.mutate(newData, {
      onSuccess() {
        Swal.fire({
          title: 'Success!',
          text: 'External Company Profile Updated.',
          icon: 'success',
          iconColor: '#3085d6',
          showConfirmButton: false,
        });
        window.setTimeout(() => {
          router.push('/external-profile');
        }, 2000);
      },
      onError() {
        Swal.fire(
          'Oops!',
          'Failed to Update External Company Profile.',
          'error'
        );
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
              External Company Profile
            </h1>
          </div>
        </div>

        {/* Company Form */}
        <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
          <section aria-labelledby='payment-details-heading'>
            <form onSubmit={handleSubmit(handleUpdateExternalCompany)}>
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
                    <div className='mt-4 col-span-4 sm:col-span-2 flex gap-10'>
                      <div className='col-span-2 sm:col-span-2'>
                        <RadioGroup
                          name='numberOfEmployees'
                          label='Number of Employees'
                          errors={errors.numberOfEmployees}
                          control={control}
                          options={numberOfEmployeesOptions}
                          defaultChecked={defaultValues.numberOfEmployees}
                          // data-cy='company-description-input'
                        />
                      </div>
                      <div className='col-span-2 sm:col-span-2'>
                        <CheckBoxGroup
                          name='ratings'
                          label='Ratings'
                          control={control}
                          options={ratingsOptions}
                          setValue={setValue}
                          errors={errors}
                          defaultChecked={defaultValues.ratings}
                          // data-cy='role-rolling-checkbox'
                        />
                      </div>
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextInput
                        name='linkedinUrl'
                        label='Linkedin Url'
                        errors={errors.linkedinUrl}
                        control={control}
                        // data-cy='company-linkedinUrl-input'
                      />
                    </div>
                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextInput
                        name='twitterUrl'
                        label='Twitter Url'
                        errors={errors.twitterUrl}
                        control={control}
                        // data-cy='company-ats-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextInput
                        name='websiteUrl'
                        label='Website Url'
                        errors={errors.websiteUrl}
                        control={control}
                        // data-cy='company-ats-input'
                      />
                    </div>
                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextInput
                        name='careerPageUrl'
                        label='Career Page Url'
                        errors={errors.careerPageUrl}
                        control={control}
                        // data-cy='company-ats-input'
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
                        defaultValue={defaultValues.companyValues}
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
                        options={jobBenefitsOptions}
                        errors={errors.companyBenefits}
                        setValue={setValue}
                        defaultValue={defaultValues.companyBenefits}
                        clearErrors={clearErrors}
                        closeMenuOnSelect={false}
                        menuPortalTarget={document.querySelector('body')}
                        // data-cy='company-values-select'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextArea
                        name='commitmentToDiversity'
                        type='textarea'
                        label='Commitment to Diversity'
                        errors={errors.commitmentToDiversity}
                        control={control}
                        rows={4}
                        // data-cy='company-description-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextArea
                        name='diversityAnnouncement'
                        type='textarea'
                        label='Diversity News/Announcement'
                        errors={errors.diversityAnnouncement}
                        control={control}
                        rows={2}
                        placeholder='Put article link here.'
                        // data-cy='company-description-input'
                      />
                    </div>
                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextArea
                        name='interestingStats'
                        type='textarea'
                        label='Interesting Stats'
                        errors={errors.interestingStats}
                        control={control}
                        rows={5}
                        // data-cy='company-description-input'
                      />
                    </div>

                    <div className='mt-4 col-span-4 sm:col-span-2'>
                      <TextArea
                        name='articles'
                        type='textarea'
                        label='Articles/News Announcements'
                        errors={errors.articles}
                        control={control}
                        rows={5}
                        placeholder='Put article links here.'
                        // data-cy='company-description-input'
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
