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
import { firestore } from './clientApp';

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
  const data =  querySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));

  const rolesDocRef = collection(firestore, 'companyRolesV2');
  const rolesDoc = await query(
    rolesDocRef,
    where('companyId', '==', data[0].id)
  );
  const rolesQuerySnapshot = await getDocs(rolesDoc);
  const roles =  rolesQuerySnapshot.docs.map((docu) => ({
    ...docu.data(),
    id: docu.id,
  }));
  return roles;
}
