import { useFirestoreQuery } from '@react-query-firebase/firestore';
import { collection, query, where } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { formatDateInArray } from '../../utils/commands';

const useQueryCollection = (collectionName) => {
  const { isLoading, data } = useFirestoreQuery(
    [collectionName],
    query(collection(firestore, collectionName)),
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const res = snapshot.docs.map((document) => ({
          ...document.data(),
          id: document.id,
        }));
        return formatDateInArray(res);
      },
    }
  );

  return { isLoading, data };
};

export default useQueryCollection;
