import SideBar from '../../components/layout/Sidebar';
import AuthRoute from '../../components/context/authRoute';
import Footer from '../../components/layout/Footer';
import IntlMessages from '../../utils/IntlMessages';

// Company Internal Information: Contains VAT, Roles posted, the on-boarding info. update logo. See how many credits they have.
// invite team mates. internal business. and stuff related to loop not luck account,
// basically what candidates want see.
// Update company information. View information / View what candidates see and a modal pops up with the view.
// - Role Permissions: Select a particular person to be a role adder / poster or hiring managers.
// - Users: Table -> Add more users, selects how many they want, they do not need to pay immediately, it gets added to their next monthly bill.

//Form Values: Onboarding form info, VAT free text box,  update logo,
//In the dashboard, see NO of roles posteD: 0

export default function CompanyProfile() {
  return (
    <AuthRoute>
      <SideBar companyPrivateProfile={true}>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='external-profile.title' />
              </h1>
            </div>
          </div>
          <h1 className='mx-auto text-bold pt-56 text-center text-5xl'>
            Work in Progress
          </h1>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
