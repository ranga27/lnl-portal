import { ChevronLeftIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import EmptyComponent from '../layout/EmptyComponent';
import Applicant from './Applicant';

const sampleApplicant = [
  {
    createdAt: 'Wed Jul 13 2022 10:59:15 GMT+0100 (West Africa Standard Time)',
    email: 'matthew@loopnotluck.com',
    behaviorAttributes: [
      'Communication',
      'Leadership',
      'Creative and Critical Thinking',
    ],
    cvUploadDate: 'Fri Jul 22 2022 13:11:36 GMT+0100',
    cvUrl:
      'https://storage.googleapis.com/loop-luck.appspot.com/cv/a518158a-f0be-4af0-9c54-531c5cae3cbe/Chanelle.pdf',
    degreeSubject: 'Fashion promo',
    disability: 'No',
    disabilityAnswer: '',
    diversity: [
      'One of my parents has attended university',
      'I was on free school meals at school',
      'Publicly funded education',
    ],
    email: 'chanellefrancism@hotmail.co.uk',
    ethnicity: 'Black / African / Caribbean / Black British',
    ethnicityOther: '',
    firstName: 'Chanelle',
    gender: 'Female',
    genderOther: '',
    graduationYear: 'Tue Jan 01 2019 01:00:00 GMT+0100',
    userId: 'bc9276f9-2135-4fe1-88ea-1cf3077f33aa',
    interests: [
      'Marketing',
      'Project and Programme Management',
      'Media, journalism, PR and publishing',
    ],
    jobValues: [
      'Flexible and Remote Working Opportunities',
      'Social Impact Driven Business',
      'Inclusive Work Culture',
    ],
    lastName: 'Francis',
    mobileNumber: '07514076817',
    noticePeriod: '4 weeks notice',
    rolesInterestedIn: ['Graduate Scheme', 'Full Time', 'Apprenticeship'],
    rolesOfInterest: 'Operations',
    specificStartDate: null,
    start: 'Notice Period',
    technicalSkills: ['Microsoft Office', 'Social Media'],
    visaRequired: 'No',
  },
];

export default function AllApplicants({ Applicants }) {
  const [isOpen, setOpen] = useState(false);

  const handleOpenApplicant = () => {
    setOpen(true);
  };
  return (
    <>
      {isOpen ? (
        <main className='py-6 flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
          <nav
            className='flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden'
            aria-label='Breadcrumb'
          >
            <a
              href='#'
              className='inline-flex items-center space-x-3 text-sm font-medium text-gray-900'
            >
              <ChevronLeftIcon
                className='-ml-2 h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
              <span>Applicants</span>
            </a>
          </nav>
          <Applicant Applicant={sampleApplicant[0]} roleData={Applicants} />
        </main>
      ) : (
        <div className='py-6 px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-gray-900'>
                Applicants
              </h1>
              <p className='mt-2 text-sm text-gray-700'>
                A list of all the candidates that have applied for this role
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto'
              >
                Refresh
              </button>
            </div>
          </div>

          {Applicants.sampleApplicants.length === 0 ? (
            <div className='mx-auto'>
              <EmptyComponent
                title='applicant.empty-title'
                subtitle='applicant.empty-subtitle'
                buttonText='roles.new'
                buttonRequired={false}
              />
            </div>
          ) : (
            <div className='mt-8 flex flex-col'>
              <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='inline-block min-w-full py-2 align-middle'>
                  <div className='overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5'>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                          >
                            Name
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Email
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Mobile Number
                          </th>
                          <th
                            scope='col'
                            className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                          >
                            Gender
                          </th>
                          <th
                            scope='col'
                            className='relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8'
                          >
                            <span className='sr-only'>View</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200 bg-white'>
                        {Applicants?.sampleApplicants.map((data) => (
                          <tr key={data.email}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                              {data.firstName + ' ' + data.lastName}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {data.email}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {data.email}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {data.gender}
                            </td>
                            <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8'>
                              <button
                                onClick={() => handleOpenApplicant(data)}
                                className='text-black hover:text-gray-600'
                              >
                                View
                                <span className='sr-only'>, {data.name}</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
