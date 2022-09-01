import { Fragment } from 'react';
import EmptyComponent from '../layout/EmptyComponent';
import { collection, query, where } from 'firebase/firestore';
import { useFirestoreQuery } from '@react-query-firebase/firestore';
import RolesListItem from './RolesListItem';
import { firestore } from '../../../firebase/clientApp';
import { formatDateInArray } from '../../utils/commands';

export default function RolesContainer({ companyId }) {
  const { isLoading, data: roles } = useFirestoreQuery(
    ['companyRolesV2'],
    query(
      collection(firestore, 'companyRolesV2'),
      where('companyId', '==', companyId)
    ),
    {
      subscribe: true,
      enabled: !!companyId,
    },
    {
      // React Query data selector
      select(snapshot) {
        const rolesData = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(rolesData);
      },
    }
  );
  if (isLoading) {
    return <div className='loading' />;
  }

  return (
    <Fragment>
      {roles.length === 0 ? (
        <EmptyComponent />
      ) : (
        <RolesListItem roles={roles} />
      )}
    </Fragment>
  );
}
