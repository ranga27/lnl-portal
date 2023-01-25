/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import {
  doc,
  getDoc,
  collection,
  setDoc,
  where,
  query,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { firestore } from './clientApp';

export async function fetchUserProfileDataFromFirestore(uid) {
  const userDocRef = doc(firestore, 'companyUsers', uid);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  return data;
}

export async function fetchLoopUsers() {
  const userDocRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(userDocRef);
  const data = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return data;
}

export async function fetchCompanyUsers() {
  const userDocRef = collection(firestore, 'companyUsers');
  const querySnapshot = await getDocs(userDocRef);
  const data = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return data;
}

export async function fetchApplicantsCollection(roleId, userID) {
  const userDocRef = collection(
    firestore,
    `companyRolesV2/${roleId}/acceptedApplicants`
  );
  const doc = await query(userDocRef, where('userId', '==', userID));

  const querySnapshot = await getDocs(doc);
  const data = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return data;
}

export async function fetchRejectedApplicantsCollection(roleId, userID) {
  const userDocRef = collection(
    firestore,
    `companyRolesV2/${roleId}/rejectedApplicants`
  );
  const doc = await query(userDocRef, where('userId', '==', userID));

  const querySnapshot = await getDocs(doc);
  const data = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return data;
}

export async function getCompanyRoles(uid) {
  const companyDocRef = collection(firestore, 'companyV2');
  const companyDoc = await query(companyDocRef, where('userId', '==', uid));
  const querySnapshot = await getDocs(companyDoc);
  const data = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  if (data.length === 0) return [];

  const rolesDocRef = collection(firestore, 'companyRolesV2');
  const rolesDoc = await query(
    rolesDocRef,
    where('companyId', '==', data[0].id)
  );
  const rolesQuerySnapshot = await getDocs(rolesDoc);
  const roles = rolesQuerySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return roles;
}

export async function getCompany(uid) {
  const companyDocRef = collection(firestore, 'companyV2');
  const companyDoc = await query(companyDocRef, where('userId', '==', uid));
  const querySnapshot = await getDocs(companyDoc);
  const company = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return company;
}

export async function getRoles(uid) {
  const rolesDocRef = collection(firestore, 'companyRolesV2');
  const rolesDoc = await query(rolesDocRef, where('companyId', '==', uid));
  const rolesQuerySnapshot = await getDocs(rolesDoc);
  const roles = rolesQuerySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return roles;
}

export async function setUserInFirestore(user) {
  const { uid, email, displayName } = user;

  const existingUserRef = collection(firestore, 'companyUsers');
  const usersDoc = await query(existingUserRef, where('email', '==', email));
  const userQuerySnapshot = await getDocs(usersDoc);
  const userDetails = userQuerySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  if (userDetails.length === 0) {
    const userRef = doc(firestore, 'companyUsers', uid);
    await setDoc(userRef, {
      id: uid,
      email: email,
      firstName: displayName,
      isOnboarded: false,
      role: 'company',
      createdAt: serverTimestamp(),
    });
  }
}

export async function updateRoleCreditsInCompanyFirestore(
  roleCredits,
  companyId
) {
  const docRef = doc(firestore, 'companyV2', companyId);
  await setDoc(
    docRef,
    {
      roleCredits: roleCredits - 1,
    },
    { merge: true }
  );
}

export async function addRoleInCompanyFirestore(data, id) {
  const docRef = doc(firestore, 'companyV2', data.companyId, 'roles', id);
  await setDoc(docRef, {
    ...data,
  });
}

export async function getAcceptedUserInRoleFirestore(roleId, userId) {
  const docRef = collection(
    firestore,
    'companyRolesV2',
    roleId,
    'acceptedApplicants'
  );

  const querySnapshot = await getDocs(docRef);
  const acceptedUsers = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  const checkIfApplicantIsAccepted = acceptedUsers.filter(
    (user) => user.userId === userId
  );

  return checkIfApplicantIsAccepted;
}

export async function getRejectedUserInRoleFirestore(roleId, userId) {
  const docRef = collection(
    firestore,
    'companyRolesV2',
    roleId,
    'rejectedApplicants'
  );

  const querySnapshot = await getDocs(docRef);
  const rejectedUsers = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  const checkIfApplicantIsRejected = rejectedUsers.filter(
    (user) => user.userId === userId
  );

  return checkIfApplicantIsRejected;
}

export async function updateInviteCreditsInCompanyFirestore(
  companyId,
  companyInviteCredits
) {
  const docRef = doc(firestore, 'companyV2', companyId);
  await setDoc(
    docRef,
    {
      inviteCredits: companyInviteCredits - 1,
    },
    { merge: true }
  );
}

export async function updateCustomQuestionsInQuestionnaireFirestore(
  customQuestions,
  roleId
) {
  const docRef = doc(firestore, 'questionnaire', roleId);
  await setDoc(
    docRef,
    {
      customQuestions,
    },
    { merge: true }
  );
}

export async function addCustomQuestionsInQuestionnaireFirestore(
  customQuestions,
  companyId,
  roleId
) {
  const docRef = doc(firestore, 'questionnaire', roleId);
  await setDoc(docRef, {
    questions: customQuestions,
    companyId: companyId,
    roleId: roleId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getStripeProducts() {
  const productDocRef = collection(firestore, 'products');
  const productDoc = await query(productDocRef, where('active', '==', true));
  const querySnapshot = await getDocs(productDoc);
  const products = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  if (products.length === 0) return [];
  let array = [];
  for (let product of products) {
    const docRef = collection(firestore, 'products', product.id, 'prices');
    const pricesRef = await query(docRef, where('active', '==', true));

    const querySnapshot = await getDocs(pricesRef);
    const prices = querySnapshot.docs.map((docu) => ({
      ...docu.data(),
      id: docu.id,
    }));
    const mergedArray = {
      ...product,
      prices: prices[0],
    };
    array.push(mergedArray);
  }

  return array;
}

export async function getCompanyDashboardMetrix(userId) {
  const conpanyRef = collection(firestore, 'companyV2');
  const q = query(conpanyRef, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const company = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  const companyID = company[0].id;

  const roleRef = collection(firestore, 'companyRolesV2');
  const roleQuery = query(roleRef, where('companyId', '==', companyID));
  const roleQuerySnapshot = await getDocs(roleQuery);
  const postedRole = roleQuerySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  return postedRole;
}

export async function fetchUserMatchedRolesFromFirestore(users) {
  const roles = [];

  for (const user of users) {
    const roleRef = collection(
      firestore,
      'users',
      user.id,
      'companyMatchedRoles'
    );
    const q = query(roleRef, where('applied', '==', true));
    const querySnapshot = await getDocs(q);
    const allRoles = querySnapshot.docs.map((docu) => ({
      ...docu.data(),
      id: docu.id,
    }));
    const mergedArray = {
      ...user,
      roles: allRoles,
    };
    roles.push(mergedArray);
  }
  const filteredRoles = roles.filter((role) => role.roles.length !== 0);

  return filteredRoles;
}

export async function updateAppliedStatus(roleId, userId, newStatus) {
  const appliedDocRef = collection(firestore, 'appliedRoles');
  const appliedRolesDoc = await query(
    appliedDocRef,
    where('roleId', '==', roleId),
    where('userId', '==', userId)
  );

  const querySnapshot = await getDocs(appliedRolesDoc);

  querySnapshot.forEach((taskDoc) => {
    setDoc(
      taskDoc.ref,
      {
        status: newStatus,
      },
      { merge: true }
    );
  });
}

export async function fetchUserData(roleId) {
  const appliedDocRef = collection(firestore, 'appliedRoles');
  const appliedRolesDoc = await query(
    appliedDocRef,
    where('roleId', '==', roleId)
  );
  const querySnapshot = await getDocs(appliedRolesDoc);
  const appliedRoles = querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  if (appliedRoles.length === 0) return [];

  const userData = [];

  for (const user of appliedRoles) {
    const userRef = doc(firestore, 'users', user.userId);
    const q = query(userRef);
    const userDoc = await getDoc(q);
    const data = userDoc.data();

    const mergedArray = {
      ...user,
      ...data,
    };
    userData.push(mergedArray);
  }

  return userData;
}
