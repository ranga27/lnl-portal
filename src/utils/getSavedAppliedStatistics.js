import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';

export const getSavedAppliedStatistics = () => {
  return new Promise(async (resolve) => {
    let statistics = [];
    const users = collection(firestore, 'users');
    const snapshot = await getDocs(users);

    snapshot.forEach(async (user) => {
      const roleRef = collection(firestore, `users/${user.id}/matchedRoles`);
      const querySnapshot = await getDocs(roleRef);
      querySnapshot.forEach((role) => {
        let roleData = role.data();
        let added = false;
        statistics.map((stats) => {
          if (stats.id === roleData.id) {
            if (roleData.saved) {
              stats.saved = stats.saved + 1;
            }
            if (roleData.applied) {
              stats.applied = stats.applied + 1;
            }
            added = true;
          }
        });
        if (!added) {
          statistics.push({
            id: role.id,
            title: roleData.title,
            company: roleData.company,
            saved: roleData.saved ? 1 : 0,
            applied: roleData.applied ? 1 : 0,
            salary: roleData.salary,
            deadline: roleData.deadline,
          });
        }
      });
      if (statistics.length) resolve(statistics);
    });
  });
};
