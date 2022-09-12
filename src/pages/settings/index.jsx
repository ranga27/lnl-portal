import SideBar from '../../components/layout/Sidebar';
import AuthRoute from '../../components/context/authRoute';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';

export default function Applicants() {
  return (
    <AuthRoute>
      <SideBar settings={true}>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='settings.title' />
              </h1>
            </div>
          </div>
                   <img src={'/assets/coming.svg'} className='w-4/5 h-4/5 mx-auto text-center' />

        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
