import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';

const useFetchPricing = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    const products = [];

    const productsSnap = await getDocs(
      query(collection(firestore, 'products'), where('active', '==', true))
    );

    productsSnap.forEach(async (productDoc) => {
      const pricesSnap = await getDocs(
        collection(firestore, 'products', productDoc.id, 'prices')
      );

      products.push({
        id: productDoc.id,
        ...productDoc.data(),
        prices: pricesSnap.docs.map((price) => {
          return {
            id: price.id,
            ...price.data(),
          };
        }),
      });
    });

    return products;
  };

  useEffect(() => {
    (async () => {
      try {
        setError(null);

        const products = await getProducts();

        setData(products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error: ', error);
        setIsLoading(false);
        setError(error.message);
      }
    })();
  }, []);

  return { data, isLoading, error };
};

export default useFetchPricing;

const getDataOnce = async () => {
  const products = [];

  const productsSnap = await getDocs(
    query(collection(firestore, 'products'), where('active', '==', true))
  );

  productsSnap.forEach(async (productDoc) => {
    const product = {
      productId: productDoc.id,
      ...productDoc.data(),
      prices: [],
    };

    const pricesSnap = await getDocs(
      query(collection(productDoc.ref, 'prices'))
    );

    pricesSnap.forEach((price) => {
      if (price.data().interval === 'month') {
        product.prices.push({
          priceId: price.id,
          ...price.data(),
        });
      } else {
        product.prices.push({
          priceId: price.id,
          ...price.data(),
        });
      }
    });

    products.push(product);
  });

  return products;
};

const getProductsWithOnSnapShotMethod = async () => {
  const products = [];

  const q = query(
    collection(firestore, 'products'),
    where('active', '==', true)
  );

  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach(async (productDoc) => {
      const product = {
        productId: productDoc.id,
        ...productDoc.data(),
        prices: [],
      };

      const q = query(collection(productDoc.ref, 'prices'));

      onSnapshot(q, (priceSnap) => {
        priceSnap.docs.forEach((price) => {
          if (price.data().interval === 'month') {
            product.prices.push({
              priceId: price.id,
              ...price.data(),
            });
          } else {
            product.prices.push({
              priceId: price.id,
              ...price.data(),
            });
          }
        });
      });
      products.push(product);
    });
  });

  return products;
};
