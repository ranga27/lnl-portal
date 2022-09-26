import { useFirestoreDocument } from '@react-query-firebase/firestore';
import { collection, doc } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';

const useDocument = async (collectionName, id) => {
  const collectionRef = collection(firestore, collectionName);
  const ref = doc(collectionRef, id);

  const { isLoading, data } = useFirestoreDocument(
    [collectionName, id],
    ref,
    {
      subscribe: true,
    },
    {
      select(snapshot) {
        const res = snapshot.exists()
          ? { ...snapshot.data(), id: snapshot.id }
          : null;
        return res;
      },
    }
  );

  return { isLoading, data };
};

export default useDocument;
