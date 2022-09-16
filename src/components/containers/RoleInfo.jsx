import React from 'react';
import { format } from 'date-fns';

const RoleInfo = ({ role }) => {
  return (
    <div className='mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
      <dl className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Location</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.location}</dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Department</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.department}</dd>
        </div>

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Experience</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.experience}</dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Qualification</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.qualification}</dd>
        </div>

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>How To Apply</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.howToApply}</dd>
        </div>
        {role.website && (
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>Website</dt>
            <dd className='mt-1 text-sm text-gray-900'>{role.website}</dd>
          </div>
        )}
        {role.meetingLink && (
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>
              Meeting Link for Hiring Manager
            </dt>
            <dd className='mt-1 text-sm text-gray-900'>{role.meetingLink}</dd>
          </div>
        )}

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Behaviour Attributes Strengths
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {role.behaviourAttributesStrengths
              ? role.behaviourAttributesStrengths.map((item) => (
                  <li key={item}>{item}</li>
                ))
              : null}
          </dd>
        </div>

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Technical Skills
          </dt>
          <dd className='mt-1 max-w-prose text-sm text-gray-900'>
            {role.technicalSkills
              ? role.technicalSkills.map((item) => <li key={item}>{item}</li>)
              : null}

            <p className='pt-2'>
              Other information about the skills: {role.technicalSkillsOther}
            </p>
          </dd>
        </div>

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Role posted on</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {format(new Date(role.createdAt.toDate()), 'dd-MMM-yyyy')}
          </dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>
            Role last edited on
          </dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {format(new Date(role.updatedAt.toDate()), 'dd-MMM-yyyy')}
          </dd>
        </div>

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Start Date</dt>
          <dd className='mt-1 text-sm text-gray-900'>
            {format(new Date(role.startDate.toDate()), 'dd-MMM-yyyy')}
          </dd>
        </div>
        {!role.rolling ? (
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>Deadline</dt>
            <dd className='mt-1 text-sm text-gray-900'>
              {format(new Date(role.updatedAt.toDate()), 'dd-MMM-yyyy')}
            </dd>
          </div>
        ) : (
          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>Rolling</dt>
            <dd className='mt-1 text-sm text-gray-900'>{role.rolling}</dd>
          </div>
        )}

        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Position Type</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.positionType}</dd>
        </div>
        <div className='sm:col-span-1'>
          <dt className='text-sm font-medium text-gray-500'>Salary</dt>
          <dd className='mt-1 text-sm text-gray-900'>{role.salary}</dd>
        </div>

        <div className='sm:col-span-2'>
          <dt className='text-sm font-medium text-gray-500'>
            Requires cover letter
          </dt>
          {role.coverLetter === true ? (
            <dd className='mt-1 max-w-prose text-sm text-gray-900'>Yes</dd>
          ) : (
            <dd className='mt-1 max-w-prose text-sm text-gray-900'>No</dd>
          )}
        </div>

        <div className='sm:col-span-2'>
          <dt className='text-sm font-medium text-gray-500'>Description</dt>
          <dd className='mt-1 text-sm text-gray-900 space-y-5'>
            {role.description}
          </dd>
        </div>

        <div className='sm:col-span-2 mb-20'>
          <dt className='text-sm font-medium text-gray-500'>
            More Information about the role
          </dt>
          <dd className='mt-1 text-sm text-gray-900 space-y-5'>
            {role.moreRoleInfo}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default RoleInfo;
