import React, { useState, useContext } from 'react';
import StepWizard from 'react-step-wizard';
import { collection, doc } from 'firebase/firestore';
import { useFirestoreDocumentData } from '@react-query-firebase/firestore';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Stepper from './Stepper';
import { AuthContext } from '../../components/context/AuthContext';
import {  firestore } from '../../../firebase/clientApp';
import Dashboard from '../dashboard';

const Onboarding = () => {
  const [fields, setFields] = useState({
    diversity: '',
    location: '',
    companyLocation: '',
    companyName: '',
    jobRole: '',
  });

  const updateForm = (values) => {
    const newFields = { ...fields, ...values };
    setFields(newFields);
  };
  const onStepChange = () => {
    // console.log(stats);
  };

  const {
    userData: { userId },
  } = useContext(AuthContext);
  const collectionRef = collection(firestore, 'companyUsers');
  const ref = doc(collectionRef, userId);
  const { isLoading, data: user } = useFirestoreDocumentData(
    ['companyUsers'],
    ref,
    {
      subscribe: true,
    },
    {
      onSuccess() {
        console.debug('User Data loaded successfully');
      },
      onError(error) {
        console.error('Woops, something went wrong!', error);
      },
    }
  );
  if (isLoading) {
    return <div className='loading' />;
  }

  if (user.isOnboarded) return <Dashboard />;

  return (
    <div className='max-w-5xl mx-auto'>
      <div className={'jumbotron'}>
        <div className='row'>
          <div className={`col-12 col-sm-6 offset-sm-3`}>
            <StepWizard
              onStepChange={onStepChange}
              isHashEnabled
              nav={<Stepper />}
            >
              <Step1 hashKey={'FirstStep'} update={updateForm} />
              <Step2 update={updateForm} />
              <Step3 />
              <Step4 hashKey={'TheEnd!'} fields={fields} />
            </StepWizard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
