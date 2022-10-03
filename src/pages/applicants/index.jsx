import SideBar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';
import ApplicantsList from '../../components/containers/Applicants';

export default function Applicants() {
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
        <ApplicantsList />
      </main>
      <Footer />
    </SideBar>
  );
}
