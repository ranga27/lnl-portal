import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { firebaseConfig } from '../src/components/data/constants';

const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);
const functions = getFunctions(getApp(), 'europe-west2');

if (process.env.NODE_ENV !== 'production') {
  connectFunctionsEmulator(functions, 'europe-west2', 'localhost', 5001);
  // TODO: check what host to connect based on firebase.json. On macOS explicit host IP is mandatory. Issue open in github
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}

export { auth, firestore, functions };
