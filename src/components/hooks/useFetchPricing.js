import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';

const useFetchPricing = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setError(null);

      const q = query(
        collection(firestore, 'products'),
        where('active', '==', true)
      );

      onSnapshot(q, (querySnapshot) => {
        const products = {};
        querySnapshot.forEach((productDoc) => {
          products[productDoc.id] = productDoc.data();
          const q = query(collection(productDoc.ref, 'prices'));
          onSnapshot(q, (priceSnap) => {
            priceSnap.docs.forEach((price) => {
              products[productDoc.id].prices = {
                priceId: price.id,
                priceData: price.data(),
              };
            });
          });
        });
        setData(products);
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error: ', error);
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  return { data, isLoading, error };
};

export default useFetchPricing;
