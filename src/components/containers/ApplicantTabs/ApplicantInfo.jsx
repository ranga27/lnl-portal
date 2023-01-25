import React from 'react';
import { format } from 'date-fns';

const ApplicantInfo = ({ Applicant }) => {
  return (
    <div className='mt-6 mb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
      <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Email</dt>
          <dd className='mt-1 text-sm text-gray-900'>{Applicant.email}</dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Phone</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.mobileNumber || '-'}
          </dd>
        </div>{' '}
        <div className='sm:col-span-2'>
          <dt className='text-sm font-medium text-gray-500'>CV</dt>
          <dd className='mt-1 text-sm text-gray-900 hover:text-[#F7B919]'>
            <a href={Applicant.cvUrl} target='_blank' rel='noreferrer'>
              {Applicant.cvUrl || '-'}
            </a>
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Gender</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.gender || '-'}
            {Applicant.genderOther && <>{Applicant.genderOther} </>}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Ethnicity</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.ethnicity || '-'}
            {Applicant.ethnicityOther && <>{Applicant.ethnicityOther} </>}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Start date</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.start || '-'}
            {Applicant.specificStartDate && (
              <p>
                Specific Start Date:
                {format(
                  new Date(Applicant.specificStartDate.toDate()),
                  'dd-MMM-yyyy'
                )}
              </p>
            )}
            {Applicant.noticePeriod && (
              <p>Notice Period: {Applicant.noticePeriod} </p>
            )}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Disability</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.disability || '-'}

            {Applicant.disability && (
              <>
                <p className='pt-2'>Disability: </p>
                {Applicant.disabilityAnswer}{' '}
              </>
            )}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Graduation Year</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {format(new Date(Applicant.graduationYear.toDate()), 'yyyy')}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Degree Subject</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.degreeSubject || '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Visa Required</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {Applicant.visaRequired || '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Behaviour Attributes Strengths
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.behaviorAttributes
              ? Applicant.behaviorAttributes.map((item) => (
                  <li key={item}>{item}</li>
                ))
              : '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Diversity</dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.diversity
              ? Applicant.diversity.map((item) => <li key={item}>{item}</li>)
              : '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Job Values</dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.jobValues
              ? Applicant.jobValues.map((item) => <li key={item}>{item}</li>)
              : '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Technical Skills
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.technicalSkills
              ? Applicant.technicalSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))
              : '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Roles Interested In
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.rolesInterestedIn
              ? Applicant.rolesInterestedIn.map((item) => (
                  <li key={item}>{item}</li>
                ))
              : '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Area of Interests
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.areaOfInterests
              ? Applicant.areaOfInterests.map((item) => (
                  <li key={item}>{item}</li>
                ))
              : '-'}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Roles Of Interest
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {Applicant.rolesOfInterest || '-'}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ApplicantInfo;
