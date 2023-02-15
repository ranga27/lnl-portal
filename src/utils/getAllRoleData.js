import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';

export const getAllRoleData = () => {
  return new Promise(async (resolve) => {
    let acceptedCount = 0;
    let rejectedCount = 0;
    let roleData = [];
    const coll = collection(firestore, 'roles');
    const snapshot = await getDocs(coll);
    snapshot.forEach(async (role) => {
      const roleRef = collection(
        firestore,
        'roles',
        role.id,
        'acceptedApplicants'
      );
      const querySnapshot = await getDocs(roleRef);
      const accepted = querySnapshot.docs.map((docu) => docu.data());
      acceptedCount = acceptedCount + accepted.length;

      const roleRef1 = collection(
        firestore,
        'roles',
        role.id,
        'rejectedApplicants'
      );

      const rejectQuerySnapshot = await getDocs(roleRef1);
      const rejected = rejectQuerySnapshot.docs.map((docu) => docu.data());
      rejectedCount = rejectedCount + rejected.length;
      const temp = { ...role.data(), accepted: accepted, rejected: rejected };

      roleData.push(temp);

      if (roleData.length === snapshot.docs.length) {
        resolve({ roleData, acceptedCount, rejectedCount });
      }
    });
  });
};
