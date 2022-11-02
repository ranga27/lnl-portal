import { loadStripe } from '@stripe/stripe-js';

export const initializeStripe = async () => {
  const stripePromise = await loadStripe(
    'pk_test_51LPk0PL0eJsZCFIwMDBHbR1FhLslkhxBZP4n1ajrBXg6SCzm28s9N3qczZHhl95SUACn6rH3bYs37U7oYuFd3LsY00XgU8xI6a'
  );

  return stripePromise;
};
