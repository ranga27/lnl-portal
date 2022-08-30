import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SideBar from '../../components/layout/Sidebar';
import { rolesSchema } from '../../components/schemas/rolesSchema';

import IntlMessages from '../../utils/IntlMessages';
import {
  useFirestoreCollectionMutation,
  useFirestoreDocumentMutation,
} from '@react-query-firebase/firestore';
import Swal from 'sweetalert2';
import { collection, serverTimestamp, doc } from 'firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import { firestore } from '../../../firebase/clientApp';
import AuthRoute from '../../components/context/authRoute';
import AddRoleForm from '../../components/form/AddRoleForm';
import Tabs from '../../components/layout/roleTabs';
import AdditionalRoleInformation from '../../components/form/AdditionalRoleInfo';
import AddOwnerForm from '../../components/form/AddOwnerForm';
import Footer from '../../components/layout/Footer';

export default function AddRole() {
  const [activeTab, setActiveTab] = useState('tab1');

  const defaultValues = {
    title: '',
    department: '',
    qualification: '',
    salary: '',
    description: '',
    howToApply: '',
    email: '',
    website: '',
    rolling: false,
    deadline: null,
    startDate: null,
    coverLetter: false,
    prescreening: false,
    rolesOfInterests: null,
    behaviourAttributesStrengths: null,
    technicalSkills: null,
    technicalSkillsOther: '',
  };

  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(rolesSchema),
  });

  const howToApply = watch('howToApply');
  const rolling = watch('rolling');
  const technicalSkillsOther = watch('technicalSkills');

  const mutation = useFirestoreCollectionMutation(
    collection(firestore, 'roles')
  );

  const updatedRoledMutation = useFirestoreDocumentMutation(
    doc(firestore, `config/roles`),
    { merge: true }
  );

  const handleAddRole = (data) => {
    const date = { createdAt: serverTimestamp(), updatedAt: serverTimestamp() };

    // TODO: update to add jobValues when creating roles.
    const newData = {
      ...data,
      ...date,
      // jobValues,
      // industry,
      // logoUrl,
      companyId: '441vhNMBmyJEXvSfnIr7',
    };

    const roleLastUpdate = { lastUpdated: serverTimestamp() };
    console.log('SUBMIT: ', newData);
    mutation.mutate(newData, {
      onSuccess() {
        Swal.fire('Added!', 'New Role Added.', 'success');
      },
      onError() {
        Swal.fire('Oops!', 'Failed to Add Role.', 'error');
      },
      onMutate() {
        console.info('Adding document...');
      },
    });
    updatedRoledMutation.mutate(roleLastUpdate);
    reset(defaultValues);
  };

  const handleChangeTab = async (data) => {
    if (data === 'tab1') {
      setActiveTab('tab1');
    } else if (data === 'tab2') {
      setActiveTab('tab2');
    } else {
      setActiveTab('tab3');
    }
  };
  return (
    <AuthRoute>
      <SideBar>
        <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none'>
          <div className='border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                Add Role
              </h1>
            </div>
          </div>
          <div className='space-y-6 sm:px-6 lg:px-0 lg:col-span-9'>
            <section aria-labelledby='payment-details-heading'>
              <form onSubmit={handleSubmit(handleAddRole)}>
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
                            activeTab={activeTab}
                            handleChangeTab={handleChangeTab}
                          />
                        ) : activeTab === 'tab2' ? (
                          <AddOwnerForm
                            activeTab={activeTab}
                            handleChangeTab={handleChangeTab}
                          />
                        ) : activeTab === 'tab3' ? (
                          <AdditionalRoleInformation
                            activeTab={activeTab}
                            handleChangeTab={handleChangeTab}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </main>
        <Footer />

      </SideBar>
    </AuthRoute>
  );
}
