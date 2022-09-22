import { initializeApp, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { firebaseConfig } from "../src/components/data/constants";

// https://react-query-firebase.invertase.dev/auth#usage
const firebase = initializeApp(firebaseConfig);

const auth = getAuth(firebase);
const firestore = getFirestore(firebase);
const functions = getFunctions(getApp());
const storage = getStorage();
if (process.env.NODE_ENV !== "production") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
  // TODO: check what host to connect based on firebase.json. On macOS explicit host IP is mandatory. Issue open in github
  connectFirestoreEmulator(firestore, "localhost", 8080);
}

export { auth, firestore };
