import { useContext } from 'react';
import { useRouter } from 'next/router';
import StepWizard from 'react-step-wizard';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Stepper from './Stepper';
import { AuthContext } from '../../components/context/AuthContext';
import Dashboard from '../dashboard';
import useDocument from '../../components/hooks/useDocument';
import useCollection from '../../components/hooks/useCollection';

const Onboarding = () => {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const onStepChange = () => {
    // console.log(stats);
  };

  const { isLoading: isUserLoading, data: user } = useDocument(
    'companyUsers',
    userId
  );

  const { isLoading: isCompanyLoading, data: company } = useCollection(
    'companyV2',
    ['userId', '==', userId]
  );

  if (isUserLoading && isCompanyLoading) {
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
              <Step1 hashKey={'FirstStep'} user={user} />
              <Step2 userId={userId} company={company[0]} />
              <Step3 userId={userId} />
              <Step4 hashKey={'TheEnd!'} user={user} company={company[0]} />
            </StepWizard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
