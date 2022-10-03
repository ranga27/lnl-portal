import { useFirestoreCollectionMutation } from '@react-query-firebase/firestore';
import { collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';

const useCollectionMutation = (collectionName) => {
  const createCollection = useFirestoreCollectionMutation(
    collection(firestore, collectionName)
  );

  const mutateCollection = (data) => {
    createCollection.mutate(
      { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
      {
        onSuccess() {
          console.log('Collection mutation successful');
        },
      },
      {
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  return { mutateCollection };
};

export default useCollectionMutation;
