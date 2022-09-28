import { useFirestoreDocumentMutation } from '@react-query-firebase/firestore';
import { doc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';

const useDocumentMutation = (collectionName, id) => {
  const createDocument = useFirestoreDocumentMutation(
    doc(firestore, collectionName, id),
    {
      merge: true,
    }
  );

  const mutateDocument = (data) => {
    createDocument.mutate(
      { ...data, updatedAt: serverTimestamp() },
      {
        onSuccess() {
          console.log('Document mutation successful');
        },
      },
      {
        onError(error) {
          console.log(error);
        },
      }
    );
  };

  return { isLoading: createDocument.isLoading, mutateDocument };
};

export default useDocumentMutation;
