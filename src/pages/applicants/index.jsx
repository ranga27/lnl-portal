import { useContext, useState, useEffect } from 'react';
import SideBar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';
import ApplicantsList from '../../components/containers/Applicants';
import { AuthContext } from '../../components/context/AuthContext';
import { getCompany } from '../../../firebase/firestoreService';
import RenewCredits from '../../components/containers/RenewCredits';

export default function Applicants() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const [company, setCompany] = useState([]);

  useEffect(() => {
    getCompany(userId).then((results) => {
      setCompany(results);
    });
  }, [userId]);

  if (company.length === 0) {
    return <div className='loading' />;
  }
  const hasCompanyInviteCredits =
    company !== [] &&
    company.length !== 0 &&
    company[0] &&
    company[0]?.inviteCredits !== 0;

  return (
    <SideBar>
      <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
        <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
              <IntlMessages id='applicant.title' />
            </h1>
          </div>
        </div>
        {hasCompanyInviteCredits ? (
          <ApplicantsList
            companyId={company && company[0]?.id}
            companyInviteCredits={company && company[0]?.inviteCredits}
            companyName={company && company[0]?.companyName}
          />
        ) : (
          <RenewCredits />
        )}
      </main>
      <Footer />
    </SideBar>
  );
}
