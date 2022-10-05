import { Fragment, useState, useEffect } from 'react';
import EmptyComponent from '../layout/EmptyComponent';
import RolesListItem from './RolesListItem';
import { getRoles } from '../../../firebase/firestoreService';

export default function RolesContainer({ companyId }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles(companyId).then((results) => {
      setRoles(results);
    });
  }, [companyId]);

  return (
    <Fragment>
      {roles.length === 0 ? (
        <EmptyComponent
          title='roles.empty-title'
          subtitle='roles.empty-subtitle'
          buttonText='roles.new'
          buttonRequired={true}
        />
      ) : (
        <RolesListItem roles={roles} />
      )}
    </Fragment>
  );
}
