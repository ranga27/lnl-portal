import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  useFirestoreCollectionMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { collection, serverTimestamp, query, where } from 'firebase/firestore';
import SideBar from '../../components/layout/Sidebar';
import { AuthContext } from '../../components/context/AuthContext';
import IntlMessages from '../../utils/IntlMessages';
import { firestore } from '../../../firebase/clientApp';
import AuthRoute from '../../components/context/authRoute';
import AddRoleForm from '../../components/form/AddRoleForm';
import Tabs from '../../components/layout/roleTabs';
import AdditionalRoleInformation from '../../components/form/AdditionalRoleInfo';
import AddOwnerForm from '../../components/form/AddOwnerForm';
import Footer from '../../components/layout/Footer';
 
export default function AddRole() {
  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'companyRolesV2')
  );
  const router = useRouter();
  const { startDate, deadline, ...role } = router.query;

  const [activeTab, setActiveTab] = useState('tab1');
  const [onClickSubmitButton, setClickSubmitButton] = useState(false);
  const [fields, setFields] = useState({
    title: role.title || '',
    location: role.location || '',
    department: role.department || '',
    qualification: role.qualification || '',
    positionType: role.positionType || '',
    salary: role.salary || '',
    description: role.description || '',
    howToApply: role.howToApply || '',
    email: role.email || '',
    website: role.website || '',
    rolling: role.rolling || false,
    deadline: role.rolling === true || deadline === undefined ? null : new Date(deadline),
    startDate: deadline !== undefined ? new Date(startDate) : null,
    coverLetter: role.coverLetter || false,
    prescreening: role.prescreening || false,
    rolesOfInterests: role.rolesOfInterests || null,
    technicalSkills: role.technicalSkills || null,
    managerId: role.managerId || '',
    moreRoleInfo: role.moreRoleInfo || '',
    behaviourAttributesStrengths: role.behaviourAttributesStrengths || null,
    experience: role.experience || null,
    technicalSkillsOther: role.technicalSkillsOther
      ? role.technicalSkillsOther
      : null,
  });

  const {
    userData: { userId },
  } = useContext(AuthContext);

  const { isLoading, data: company } = useFirestoreQuery(
    ['companyV2'],
    query(collection(firestore, 'companyV2'), where('userId', '==', userId)),
    {
      subscribe: true,
    },
    {
      // React Query data selector
      select(snapshot) {
        const companiesData = snapshot.docs.map((document) => ({
          id: document.id,
        }));
        return companiesData;
      },
    }
  );

  if (isLoading) {
    return <div className='loading' />;
  }

  const handleChangeTab = async (data) => {
    if (data === 'tab1') {
      setActiveTab('tab1');
    } else if (data === 'tab2') {
      setActiveTab('tab2');
    } else {
      setActiveTab('tab3');
    }
  };

  const handleLastTabButton = async (data) => {
    if (data) {
      setClickSubmitButton(true);
    }
  };

  const onSubmit = async (data) => {
    const newFields = { ...fields, ...data };
    setFields(newFields);
    const {
      title,
      location,
      managerId,
      department,
      qualification,
      positionType,
      salary,
      description,
      howToApply,
      startDate,
      coverLetter,
      prescreening,
      rolesOfInterests,
      technicalSkills,
      moreRoleInfo,
      behaviourAttributesStrengths,
      experience,
    } = newFields;

    if (onClickSubmitButton) {
      if (
        !title ||
        !location ||
        !department ||
        !qualification ||
        !positionType ||
        !salary ||
        !description ||
        !howToApply ||
        !startDate ||
        !coverLetter ||
        !prescreening ||
        !rolesOfInterests ||
        !technicalSkills ||
        !moreRoleInfo ||
        !behaviourAttributesStrengths ||
        !experience ||
        !managerId
      ) {
        return Swal.fire({
          icon: 'error',
          title: 'Empty Fields',
          text: 'Please fill all fields before submitting',
        });
      } else {
        const date = {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const newData = {
          ...fields,
          ...date,
          companyId: company[0].id,
          pinned: false,
        };

        mutation.mutate(newData, {
          onSuccess() {
            Swal.fire({
              title: 'Success!',
              text: 'New Role Added.',
              icon: 'success',
              iconColor: '#3085d6',
              showConfirmButton: false,
            });
            window.setTimeout(() => {
              router.push('/roles');
            }, 2000);
          },
          onError() {
            Swal.fire('Oops!', 'Failed to Add Role.', 'error');
          },
          onMutate() {
            console.info('Adding role...');
          },
        });
      }
    }
  };
  return (
    <AuthRoute>
      <SideBar>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                <IntlMessages id='roles.create' />
              </h1>
            </div>
          </div>
          <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
            <section aria-labelledby='payment-details-heading'>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='bg-white py-6 px-4 sm:p-6'>
                  <div className='shadow sm:rounded-md sm:overflow-hidden'>
                    <div className='bg-white sm:px-6 sm:pt-2'>
                      <Tabs
                        activeTab={activeTab}
                        handleChangeTab={handleChangeTab}
                      />
                    </div>

                    <div>
                      {activeTab === 'tab1' ? (
                        <AddRoleForm
                          handleChangeTab={handleChangeTab}
                          handleSaveFields={(data) => onSubmit(data)}
                          fields={fields}
                        />
                      ) : activeTab === 'tab2' ? (
                        <AddOwnerForm
                          handleChangeTab={handleChangeTab}
                          handleSaveFields={(data) => onSubmit(data)}
                          fields={fields}
                        />
                      ) : activeTab === 'tab3' ? (
                        <AdditionalRoleInformation
                          handleSaveFields={(data) => onSubmit(data)}
                          fields={fields}
                          handleLastTabButton={handleLastTabButton}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </SideBar>
    </AuthRoute>
  );
}
