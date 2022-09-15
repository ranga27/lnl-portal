import React, { useContext } from 'react';
import { collection, serverTimestamp, doc } from 'firebase/firestore';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import IntlMessages from '../../utils/IntlMessages';
import { useRouter } from 'next/router';
import { firestore } from '../../../firebase/clientApp';
import { AuthContext } from '../../components/context/AuthContext';
import { uploadFile } from '../../utils/uploadFile';
import Button from '../../components/UI/Form/Button';

export default function Step4({ fields }) {
  const router = useRouter();
  const { userData } = useContext(AuthContext);

  const createCompany = useFirestoreCollectionMutation(
    collection(firestore, 'companyV2')
  );

  const userRef = doc(firestore, 'companyUsers', userData.userId);
  const userMutation = useFirestoreDocumentMutation(userRef, {
    merge: true,
  });

  const handleSave = async () => {
    const {
      mobileNumber,
      location,
      jobRole,
      ats,
      companyLocation,
      companyName,
      companyValues,
      description,
      diversity,
      hearAbout,
      industry,
      linkedinUrl,
      logoUrl,
      visa,
    } = fields;

    if (logoUrl) {
      const newLogoUrl = await uploadFile(logoUrl, companyName, 'companyLogos');
      logoUrl = newLogoUrl;
    }

    userMutation.mutate(
      {
        isOnboarded: true,
        mobileNumber,
        location,
        jobRole,
        updatedAt: serverTimestamp(),
      },
      {
        onSuccess() {
          console.log('Successful');
        },
      }
    );

    createCompany.mutate({
      companyValues,
      companyName,
      description,
      diversity,
      hearAbout,
      industry,
      linkedinUrl,
      ats,
      logoUrl,
      companyLocation,
      visa,
      isOnboarded: true,
      userId: userData.userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    router.push('/dashboard');
  };

  return (
    <div>
      <h2 className='mt-10 text-3xl font-extrabold text-gray-900'>
        <IntlMessages id='onboarding.accountHeader' />
      </h2>
      <p className='my-2'>
        Please confirm you have filled in the required details and click on the
        button below to submit
      </p>
      <div className='my-12'>
        <Button
          text={'onboarding.confirm'}
          type='submit'
          onClick={handleSave}
          disabled={userMutation.isLoading}
          width='w-full'
          color='text-white'
          bg='bg-gray-900'
        />
      </div>
    </div>
  );
}
