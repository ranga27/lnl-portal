import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';

export const getSavedAppliedStatistics = async () => {
  const usersRef = collection(firestore, 'users');
  const usersSnapshot = await getDocs(usersRef);

  const statistics = [];
  let totalApplied = 0;
  let totalSaved = 0;

  for (const userDoc of usersSnapshot.docs) {
    console.log('Function Called');
    const matchedRolesRef = collection(
      firestore,
      `users/${userDoc.id}/matchedRoles`
    );
    const matchedRolesSnapshot = await getDocs(matchedRolesRef);

    for (const roleDoc of matchedRolesSnapshot.docs) {
      const roleData = roleDoc.data();
      const existingStats = statistics.find((stats) => stats.id === roleDoc.id);

      if (existingStats) {
        existingStats.saved += roleData.saved ? 1 : 0;
        existingStats.applied += roleData.applied ? 1 : 0;
        existingStats.score.push(roleData.score);
      } else {
        statistics.push({
          id: roleDoc.id,
          title: roleData.title,
          company: roleData.company,
          saved: roleData.saved ? 1 : 0,
          applied: roleData.applied ? 1 : 0,
          salary: roleData.salary,
          deadline: roleData.deadline,
          score: [roleData.score],
        });
      }

      if (roleData.applied) {
        totalApplied++;
      }
      if (roleData.saved) {
        totalSaved++;
      }
    }
  }
  if (statistics.length) return statistics;
};
