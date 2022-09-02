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

export default function Step4({ fields }) {
  const router = useRouter();
  const { userData } = useContext(AuthContext);

  const createCompany = useFirestoreCollectionMutation(
    collection(firestore, 'companyV2')
  );

  const userRef = doc(firestore, 'users', userData.userId);
  const userMutation = useFirestoreDocumentMutation(userRef, {
    merge: true,
  });

  const handleSave = async () => {
    if (fields.logoUrl) {
      const newLogoUrl = await uploadFile(
        fields.logoUrl,
        fields.companyName,
        'companyLogos'
      );
      fields.logoUrl = newLogoUrl;
    }

    userMutation.mutate(
      { isOnboarded: true },
      {
        onSuccess() {
          console.log('Successful');
        },
      }
    );

    createCompany.mutate({
      ...fields,
      isOnboarded: true,
      userId: userData.userId,
      createdAt: serverTimestamp(),
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
      <button
        className='w-full rounded-md bg-[#F7B919] font-medium text-white my-8  p-2'
        type='submit'
        onClick={handleSave}
      >
        <IntlMessages id='onboarding.confirm' />
      </button>
    </div>
  );
}
