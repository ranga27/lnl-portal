import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import { initializeStripe } from './initializeStripe';

/**
 * Create a new checkout session in the subcollection inside the user document
 * @param {String} uid
 * @param {String} price // e.g. price_1LnhsWL0eJsZCFIwTEUITVDk <- Get it from stripe dashboard
 */
export const createCheckoutSession = async (uid, price, type) => {
  try {
    const docRef = doc(firestore, 'companyUsers', uid);
    const subcollectionRef = collection(docRef, 'checkout_sessions');
    const checkoutSessionRef = await addDoc(subcollectionRef, {
      price,
      success_url:
        type === 'in_app'
          ? process.env.NEXT_PUBLIC_STRIPE_FAILURE_URL_IN_APP
          : process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL,
      cancel_url:
        type === 'in_app'
          ? process.env.NEXT_PUBLIC_STRIPE_FAILURE_URL_IN_APP
          : process.env.NEXT_PUBLIC_STRIPE_FAILURE_URL,
    });

    // Wait for the checkout session to get attached by extension
    if (checkoutSessionRef.id) {
      onSnapshot(checkoutSessionRef, async (doc) => {
        const { sessionId } = doc.data();

        if (sessionId) {
          // Init stripe
          const stripe = await initializeStripe();
          stripe.redirectToCheckout({
            sessionId,
          });
        }
      });
    }
  } catch (error) {
    console.error('Error: ', error);
  }
};
