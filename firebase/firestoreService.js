/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import {
  doc,
  getDoc,
  collection,
  where,
  query,
  getDocs,
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

export async function sendOnboardingEmail(data) {
  try {
    const sendOnboardingEmailFunction = httpsCallable(
      functions,
      'users-sendonboardingemail'
    );

    sendOnboardingEmailFunction({
      data: {
        email: data.email,
      },
    })
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => {
        console.log(error);
      });

    return sendOnboardingEmailFunction(data);
  } catch (e) {
    console.error(e);
  }
}
