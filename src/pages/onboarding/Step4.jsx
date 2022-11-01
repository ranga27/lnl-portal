import React, { useContext } from 'react';
import IntlMessages from '../../utils/IntlMessages';
import { useRouter } from 'next/router';
import { AuthContext } from '../../components/context/AuthContext';
import Button from '../../components/UI/Form/Button';
import useDocumentMutation from '../../components/hooks/useDocumentMutation';

export default function Step4({ company }) {
  const router = useRouter();
  const {
    userData: { userId, userEmail },
  } = useContext(AuthContext);

  const { isLoading: isUserMutationLoading, mutateDocument: mutateUser } =
    useDocumentMutation('companyUsers', userId);

  const { isLoading: isCompanyMutationLoading, mutateDocument: mutateCompany } =
    useDocumentMutation('companyV2', company?.id || 'noId');

  const handleSave = async () => {
    mutateUser({
      isOnboarded: true,
    });

    mutateCompany({
      isOnboarded: true,
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
          disabled={isUserMutationLoading && isCompanyMutationLoading}
          width='w-full'
          color='text-white'
          bg='bg-gray-900'
        />
      </div>
    </div>
  );
}
