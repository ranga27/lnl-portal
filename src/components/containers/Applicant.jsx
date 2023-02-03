/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import { getName } from '../../utils/commands';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import Swal from 'sweetalert2';
import { doc, collection, serverTimestamp, getDoc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import {
  fetchApplicantsCollection,
  getAcceptedUserInRoleFirestore,
  getRejectedUserInRoleFirestore,
  updateInviteCreditsInCompanyFirestore,
  fetchRejectedApplicantsCollection,
  updateAppliedStatus,
} from '../../../firebase/firestoreService';
import axios from 'axios';
import RoleQuestions from './ApplicantTabs/RoleQuestions';
import ApplicantInfo from './ApplicantTabs/ApplicantInfo';
import HiringManager from './ApplicantTabs/HiringManager';

const tabs = [
  { tab: 'tab1', name: 'About', href: '#', current: true },
  { tab: 'tab2', name: 'Role Questions', href: '#', current: false },
  { tab: 'tab3', name: 'Hiring Manager', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Applicant = ({ Applicant, roleData }) => {
  const [acceptedUsers, setAcceptedUsers] = useState([]);
  const [rejectedUsers, setRejectedUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('tab1');
  const [hiringManagerEmail, setHiringManagerEmail] = useState('');

  const getHiringManagerData = async () => {
    const hiringManagerData = await (
      await getDoc(doc(firestore, 'companyUsers', roleData.managerId))
    ).data();
    setHiringManagerEmail(hiringManagerData.email);
  };

  useEffect(() => {
    getHiringManagerData();
  }, []);

  const handleChangeTab = async (data) => {
    if (data === 'tab1') {
      setActiveTab('tab1');
    } else if (data === 'tab2') {
      setActiveTab('tab2');
    } else {
      setActiveTab('tab3');
    }
  };
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

  const updateMatchedRoleMutation = useFirestoreDocumentMutation(
    doc(
      firestore,
      `users/${Applicant.userId}/companyMatchedRoles`,
      roleData.id
    ),
    { merge: true }
  );

  const handleAcceptCandidate = (data) => {
    console.log(hiringManagerEmail, 'InAcceptFunction');
    const newData = {
      userId: data.userId,
      updatedAt: serverTimestamp(),
    };
    const newStatus = 'Accepted';
    const emailData = {
      firstName: Applicant.firstName,
      status: 'Accepted',
      companyName: roleData.companyName,
      email: Applicant.email,
      customMessage: roleData.customMessage,
      roleName: roleData.title,
      hiringManagerEmail: hiringManagerEmail,
    };
    acceptCandidateMutation.mutate(newData, {
      async onSuccess() {
        await updateMatchedRoleMutation.mutate({ status: 'Accepted' });
        await updateAppliedStatus(roleData.id, Applicant.userId, newStatus);
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
        await Swal.fire({
          title: 'Success!',
          text: 'Candidate Accepted.',
          icon: 'success',
          iconColor: '#3085d6',
          showConfirmButton: false,
        });
        await axios
          .post(
            process.env.NODE_ENV === 'development'
              ? process.env.NEXT_PUBLIC_DEV_SEND_APPLICANT_EMAIL
              : process.env.NEXT_PUBLIC_PROD_SEND_APPLICANT_EMAIL,
            emailData,
            { headers: { 'Access-Control-Allow-Origin': '*' } }
          )
          .then(() => console.log('email sent'))
          .catch((error) => console.log(error));
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
    const newStatus = 'Rejected';

    const emailData = {
      firstName: Applicant.firstName,
      status: 'Rejected',
      companyName: roleData.companyName,
      email: Applicant.email,
      customMessage: roleData.customMessage,
      roleName: roleData.title,
      hiringManagerEmail: hiringManagerEmail,
    };

    rejectCandidateMutation.mutate(newData, {
      async onSuccess() {
        await updateMatchedRoleMutation.mutate({ status: 'Rejected' });
        await updateAppliedStatus(roleData.id, Applicant.userId, newStatus);

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

        await axios
          .post(
            process.env.NODE_ENV === 'development'
              ? process.env.NEXT_PUBLIC_DEV_SEND_APPLICANT_EMAIL
              : process.env.NEXT_PUBLIC_PROD_SEND_APPLICANT_EMAIL,
            emailData
          )
          .then(() => console.log('email sent'));

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

  const [getAppliedUserData, setAppliedUserData] = useState([]);
  useEffect(() => {
    fetchApplicantsCollection(roleData.id, Applicant.userId).then((result) =>
      setAppliedUserData(result)
    );
  }, [roleData.id, Applicant.userId]);

  const [getRejectedAppliedUserData, setRejectedAppliedUserData] = useState([]);
  useEffect(() => {
    fetchRejectedApplicantsCollection(roleData.id, Applicant.userId).then(
      (result) => setRejectedAppliedUserData(result)
    );
  }, [roleData.id, Applicant.userId]);

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
              {Applicant.photoUrl ? (
                <img
                  src={Applicant.photoUrl}
                  className='h-12 w-12 rounded-full'
                  alt={Applicant.firstName + Applicant.lastName}
                />
              ) : (
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
              )}
            </div>
            <div className='mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
              <div className='sm:hidden 2xl:block mt-6 min-w-0 flex-1'>
                <h1 className='text-2xl font-bold text-gray-900 truncate'>
                  {Applicant.firstName}
                </h1>
              </div>
              <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                {acceptedUsers.length === 0 &&
                getAppliedUserData.length === 0 ? (
                  <button
                    type='button'
                    onClick={() => handleAcceptCandidate(Applicant)}
                    disabled={
                      rejectedUsers.length === 1 ||
                      getAppliedUserData.length !== 0 ||
                      getRejectedAppliedUserData.length !== 0
                    }
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
                {rejectedUsers.length === 0 &&
                getAppliedUserData.length === 0 ? (
                  <button
                    type='button'
                    disabled={
                      acceptedUsers.length === 1 ||
                      getAppliedUserData.length !== 0 ||
                      getRejectedAppliedUserData.length !== 0
                    }
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

      <div className='mt-6 sm:mt-2 2xl:mt-5'>
        <div className='border-b border-gray-200'>
          <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
            <nav className='-mb-px flex space-x-8' aria-label='Tabs'>
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => handleChangeTab(tab.tab)}
                  className={classNames(
                    tab.tab === activeTab
                      ? 'border-[#F7B919] text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {activeTab === 'tab1' ? (
        <ApplicantInfo Applicant={Applicant} />
      ) : activeTab === 'tab2' ? (
        <RoleQuestions Applicant={Applicant} roleData={roleData} />
      ) : activeTab === 'tab3' ? (
        <HiringManager />
      ) : null}
    </article>
  );
};

export default Applicant;
