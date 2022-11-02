import { httpsCallable } from 'firebase/functions';
import { functions } from '../../../firebase/clientApp';

export const sendToCustomerPortal = async () => {
  const functionRef = httpsCallable(
    functions,
    'ext-firestore-stripe-payments-createPortalLink'
  );
  const { data } = await functionRef({ returnUrl: window.location.origin });
  window.location.assign(data.url);
};
