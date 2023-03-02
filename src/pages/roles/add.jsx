import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import {
  collection,
  serverTimestamp,
  query,
  where,
  doc,
} from 'firebase/firestore';
import SideBar from '../../components/layout/Sidebar';
import { AuthContext } from '../../components/context/AuthContext';
import IntlMessages from '../../utils/IntlMessages';
import { firestore } from '../../../firebase/clientApp';
import AuthRoute from '../../components/context/authRoute';
import AddRoleForm from '../../components/form/AddRoleForm';
import Tabs from '../../components/layout/roleTabs';
import AdditionalRoleInformation from '../../components/form/AdditionalRoleInfo';
import CustomQuestions from '../../components/form/customQuestions/CustomQuestions';
import AddOwnerForm from '../../components/form/AddOwnerForm';
import Footer from '../../components/layout/Footer';
import {
  addCustomQuestionsInQuestionnaireFirestore,
  addRoleInCompanyFirestore,
  updateCustomQuestionsInQuestionnaireFirestore,
  updateRoleCreditsInCompanyFirestore,
} from '../../../firebase/firestoreService';
import { v4 as uuidv4 } from 'uuid';

export default function AddRole() {
  const roleId = uuidv4();

  const mutation = useFirestoreDocumentMutation(
    doc(firestore, 'roles', roleId)
  );

  const router = useRouter();
  const { startDate, deadline, ...role } = router.query;
  const defaultRoleStartDate = new Date(startDate);
  const defaultRoleDeadline = !deadline ? null : new Date(deadline);
  const [activeTab, setActiveTab] = useState('tab1');
  const [fields, setFields] = useState({
    title: role.title || '',
    location: role.location || '',
    locationType: role.locationType || '',
    department: role.department || '',
    positionType: role.positionType || '',
    salary: role.salary || '',
    description: role.description || '',
    customMessage: role.customMessage || '',
    website: role.website || '',
    rolling: role.rolling || false,
    deadline: role.rolling === true ? null : defaultRoleDeadline,
    startDate: startDate !== undefined ? defaultRoleStartDate : null,
    rolesOfInterests: role.rolesOfInterests || null,
    areaOfInterests: role.areaOfInterests || null,
    technicalSkills: role.technicalSkills || null,
    managerId: role.managerId || '',
    moreRoleInfo: role.moreRoleInfo || '',
    behaviourAttributesStrengths: role.behaviourAttributesStrengths || null,
    experience: role.experience || null,
    technicalSkillsOther: role.technicalSkillsOther
      ? role.technicalSkillsOther
      : null,
  });

  const roleRef = doc(firestore, 'roles', role.id || '1');
  const rolesMutation = useFirestoreDocumentMutation(roleRef, {
    merge: true,
  });

  const updatedRoleConfigMutation = useFirestoreDocumentMutation(
    doc(firestore, `config/companyRoles`),
    { merge: true }
  );

  const {
    userData: { userId },
  } = useContext(AuthContext);

  const { isLoading, data: company } = useFirestoreQuery(
    ['companyV2'],
    query(collection(firestore, 'companyV2'), where('userId', '==', userId)),
    {
      subscribe: false,
    },
    {
      // React Query data selector
      select(snapshot) {
        const companiesData = snapshot.docs.map((document) => ({
          id: document.id,
          companyName: document.data().companyName,
          roleCredits: document.data().roleCredits,
          companyUser: document.data().userId,
          jobValues: document.data().companyValues,
          logoUrl: document.data().logoUrl,
          industry: document.data().industry,
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
    } else if (data === 'tab3') {
      setActiveTab('tab3');
    } else {
      setActiveTab('tab4');
    }
  };

  const updateForm = (values) => {
    const newFields = { ...fields, ...values };
    setFields(newFields);
  };

  const onSubmit = async (data) => {
    const newFields = { ...fields, ...data };
    const {
      title,
      location,
      managerId,
      department,
      positionType,
      salary,
      description,
      customMessage,
      startDate,
      rolesOfInterests,
      technicalSkills,
      moreRoleInfo,
      behaviourAttributesStrengths,
      experience,
    } = newFields;

    const customQuestions = data.customQuestions;

    if (
      !title ||
      !department ||
      !positionType ||
      !salary ||
      !description ||
      !customMessage ||
      !startDate ||
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
        company: company[0].companyName,
        jobValues: company[0].jobValues,
        logoUrl: company[0].logoUrl,
        industry: company[0].industry,
        pinned: false,
        type: 'company-role',
        archived:  false,
        isQuestion: customQuestions.length ? true : false,
      };

      if (role && role.id) {
        rolesMutation.mutate(newData, {
          async onSuccess() {
            await addRoleInCompanyFirestore(newData, role.id);

            // TODO: Fix below
            await updateCustomQuestionsInQuestionnaireFirestore(
              customQuestions,
              role.id
            );

            Swal.fire({
              title: 'Success!',
              text: 'Role Updated.',
              icon: 'success',
              iconColor: '#3085d6',
              showConfirmButton: false,
            });
            window.setTimeout(() => {
              router.push('/roles');
            }, 2000);
          },
          onError() {
            Swal.fire('Oops!', 'Failed to update Role.', 'error');
          },
          onMutate() {
            console.info('Updating role...');
          },
        });
      } else {
        mutation.mutate(newData, {
          async onSuccess() {
            await addRoleInCompanyFirestore(newData, roleId);

            await updateRoleCreditsInCompanyFirestore(
              company[0].roleCredits,
              company[0].id
            );

            await addCustomQuestionsInQuestionnaireFirestore(
              customQuestions,
              company[0].id,
              roleId
            );

            updatedRoleConfigMutation.mutate({
              lastUpdated: serverTimestamp(),
            });

            Swal.fire({
              title: 'Success!',
              text: 'New Role Added.',
              icon: 'success',
              iconColor: '#3085d6',
              timer: 2000,
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
                          handleSaveFields={updateForm}
                          fields={fields}
                          companyName={company[0]?.companyName}
                        />
                      ) : activeTab === 'tab2' ? (
                        <AddOwnerForm
                          handleChangeTab={handleChangeTab}
                          handleSaveFields={updateForm}
                          fields={fields}
                          companyUser={company[0].companyUser}
                        />
                      ) : activeTab === 'tab3' ? (
                        <AdditionalRoleInformation
                          handleChangeTab={handleChangeTab}
                          handleSaveFields={updateForm}
                          fields={fields}
                        />
                      ) : activeTab === 'tab4' ? (
                        <CustomQuestions
                          handleSaveFields={(data) => onSubmit(data)}
                          fields={fields}
                          companyId={company[0]?.id}
                          roleCredits={company[0]?.roleCredits}
                          role={role}
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

// Adding a comment to push