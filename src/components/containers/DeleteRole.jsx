import React from 'react';
import { useFirestoreDocumentDeletion } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';

export default function DeleteRole({ id }) {
  const deleteRoleRef = collection(firestore, 'companyRolesV2');
  const ref = doc(deleteRoleRef, id);
  const mutation = useFirestoreDocumentDeletion(ref);

  mutation.mutate({
    onSuccess() {
      console.log('Successful');
    },
  });

  return <></>;
}
