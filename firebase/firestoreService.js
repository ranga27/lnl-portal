/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './clientApp';

export async function fetchUserProfileDataFromFirestore(uid) {
  const userDocRef = doc(firestore, 'users', uid);
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data();
  return data;
}
