import React from 'react';
import {
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from '@react-query-firebase/firestore';
import {
  query,
  where,
  collection,
  serverTimestamp,
  doc,
} from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { archiveAndUnArchiveRoleInUsersMatchedRoles } from '../../../firebase/firestoreService';

export default function RoleArchiveAndUnarchive({ id, status }) {
  const { isAllUsersLoading, data: usersList } = useFirestoreQuery(
    ['users'],
    query(collection(firestore, 'users'), where('role', '==', 'candidate')),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const userData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        const users = userData.filter(
          (user) => user.hasCompletedProfile && user.isOnboarded
        );
        return users;
      },
    }
  );

  const mutation = useFirestoreDocumentMutation(doc(firestore, 'roles', id), {
    merge: true,
  });
  const updateRole = {
    archived: status,
    updatedAt: serverTimestamp(),
  };

  mutation.mutate(updateRole, {
    async onSuccess() {
      Swal.fire('Success!', 'Role has been archived', 'success');
      await usersList.map((user) => {
        return archiveAndUnArchiveRoleInUsersMatchedRoles(id, user.id, status).then(() => {
          console.log('Running...');
        });
      });
    },
    onError(error) {
      Swal.fire('Oops!', 'Failed to update role.', 'error');
      console.error(error);
    },
    onMutate() {
      console.info('Updating role...');
    },
  });

  if (isAllUsersLoading) {
    return <div className='loading' />;
  }

  return <></>;
}
