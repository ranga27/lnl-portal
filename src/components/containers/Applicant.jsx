/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { getName } from '../../utils/commands';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import Swal from 'sweetalert2';
import { collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import {
  getAcceptedUserInRoleFirestore,
  getRejectedUserInRoleFirestore,
  updateInviteCreditsInCompanyFirestore,
} from '../../../firebase/firestoreService';

const tabs = [
  { name: 'About', href: '#', current: true },
  { name: 'Applied Roles', href: '#', current: false },
  { name: 'Feedback', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Applicant = ({ Applicant, roleData }) => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);

  const acceptCandidateRef = collection(
    firestore,
    'companyRolesV2',
    roleData.id,
    'acceptedApplicants'
  );

  const rejectCandidateRef = collection(
    firestore,
    'companyRolesV2',
    roleData.id,
    'rejectedApplicants'
  );
  const acceptCandidateMutation = useFirestoreCollectionMutation(
    acceptCandidateRef,
    {
      merge: true,
    }
  );

  const rejectCandidateMutation = useFirestoreCollectionMutation(
    rejectCandidateRef,
    {
      merge: true,
    }
  );

  const handleAcceptCandidate = (data) => {
    const newData = {
      userId: data.userId,
      updatedAt: serverTimestamp(),
    };

    acceptCandidateMutation.mutate(newData, {
      async onSuccess() {
        await getAcceptedUserInRoleFirestore(
          roleData.id,
          Applicant.userId
        ).then((results) => {
          setAcceptedUsers(results);
        });
        await getRejectedUserInRoleFirestore(
          roleData.id,
          Applicant.userId
        ).then((results) => {
          setRejectedUsers(results);
        });
        await updateInviteCreditsInCompanyFirestore(
          roleData.companyId,
          roleData.companyInviteCredits
        );
        Swal.fire({
          title: 'Success!',
          text: 'Candidate Accepted.',
          icon: 'success',
          iconColor: '#3085d6',
          showConfirmButton: false,
        });
      },
      onError() {
        Swal.fire('Oops!', 'Error accepting candidate.', 'error');
      },
      onMutate() {
        console.info('accepting candidate...');
      },
    });
  };

  const handleRejectCandidate = (data) => {
    const newData = {
      userId: data.userId,
      updatedAt: serverTimestamp(),
    };

    rejectCandidateMutation.mutate(newData, {
      async onSuccess() {
        await getAcceptedUserInRoleFirestore(
          roleData.id,
          Applicant.userId
        ).then((results) => {
          setAcceptedUsers(results);
        });
        await getRejectedUserInRoleFirestore(
          roleData.id,
          Applicant.userId
        ).then((results) => {
          setRejectedUsers(results);
        });
        Swal.fire({
          title: 'Success!',
          text: 'Candidate Rejected.',
          icon: 'success',
          iconColor: '#3085d6',
          showConfirmButton: false,
        });
      },
      onError() {
        Swal.fire('Oops!', 'Error rejecting candidate.', 'error');
      },
      onMutate() {
        console.info('rejecting candidate...');
      },
    });
  };
  return (
    <article>
      <div>
        <div>
          <img
            className='h-32 w-full object-cover lg:h-48'
            src='https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
            alt='Cover Background'
          />
        </div>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
            <div className='flex'>
              <Avatar
                name={
                  getName(Applicant.firstName) +
                  ' ' +
                  getName(Applicant.lastName)
                }
                size='120px'
                className='rounded-full flex-shrink-0'
                color='#26ADB4'
              />
            </div>
            <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
              <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                <h1 className='text-2xl font-bold text-gray-900 truncate'>
                  {Applicant.firstName}
                </h1>
              </div>
              <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                {acceptedUsers.length === 0 ? (
                  <button
                    type='button'
                    onClick={() => handleAcceptCandidate(Applicant)}
                    disabled={rejectedUsers.length === 1}
                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                  >
                    <CheckIcon
                      className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span>Accept</span>
                  </button>
                ) : (
                  <button
                    type='button'
                    disabled
                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                  >
                    <CheckIcon
                      className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span>Accepted</span>
                  </button>
                )}
                {rejectedUsers.length === 0 ? (
                  <button
                    type='button'
                    disabled={acceptedUsers.length === 1}
                    onClick={() => handleRejectCandidate(Applicant)}
                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                  >
                    <XIcon
                      className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span>Reject</span>
                  </button>
                ) : (
                  <button
                    type='button'
                    disabled
                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7B919]'
                  >
                    <XIcon
                      className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                      aria-hidden='true'
                    />
                    <span>Rejected</span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
            <h1 className='text-2xl font-bold text-gray-900 truncate'>
              {getName(Applicant.firstName) + ' ' + getName(Applicant.lastName)}
            </h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className='mt-6 sm:mt-2 2xl:mt-5'>
        <div className='border-b border-gray-200'>
          <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
            <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  className={classNames(
                    tab.current
                      ? 'border-[#F7B919] text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

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
                <p>Specific Start Date: {Applicant.specificStartDate} </p>
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
            <dt className='text-sm font-medium text-gray-500'>
              Graduation Year
            </dt>
            <dd className='mt-1 text-sm text-gray-900'>
              {Applicant.graduationYear || '-'}
            </dd>
          </div>

          <div className='sm:col-span-1'>
            <dt className='text-sm font-medium text-gray-500'>
              Degree Subject
            </dt>
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
            <dt className='text-sm font-medium text-gray-500'>Interests</dt>
            <dd className='mt-1 max-w-prose text-sm text-gray-900'>
              {Applicant.interests
                ? Applicant.interests.map((item) => <li key={item}>{item}</li>)
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
    </article>
  );
};

export default Applicant;
