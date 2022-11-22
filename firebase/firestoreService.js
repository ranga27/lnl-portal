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
import { httpsCallable } from 'firebase/functions';
import { firestore, functions } from './clientApp';

export async function fetchUserProfileDataFromFirestore(uid) {
  const userDocRef = doc(firestore, 'companyUsers', uid);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
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
