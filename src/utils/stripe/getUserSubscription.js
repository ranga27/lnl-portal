import { auth } from '../../../firebase/clientApp';

export const getUserSubscription = async () => {
  await auth.currentUser.getIdToken(true);

  const decodedToken = await auth.currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole;
};
