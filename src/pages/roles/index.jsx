import { useContext, useState, useEffect } from 'react';
import SideBar from '../../components/layout/Sidebar';
import { AuthContext } from '../../components/context/AuthContext';
import RolesContainer from '../../components/containers/rolesContainer';
import { getCompany } from '../../../firebase/firestoreService';

export default function Roles() {
  const {
    userData: { userId },
  } = useContext(AuthContext);

  const [company, setCompany] = useState([]);

  useEffect(() => {
    getCompany(userId).then((results) => {
      setCompany(results);
    });
  }, [userId]);

  return (
    <SideBar>
      {company.length !== 0 && (
        <RolesContainer companyId={company && company[0]?.id} />
      )}
    </SideBar>
  );
}
