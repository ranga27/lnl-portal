import { buffer } from 'micro';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../../firebase/lnlDevServiceAccount.json');

// Initialize firebase-admin app
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Initialize stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

const fulFillOrder = async (session) => {
  const firestore = app.firestore();

  return firestore
    .collection('companyUsers')
    .where('email', '==', session.customer_details.email)
    .get()
    .then((docs) => {
      docs.forEach((user) => {
        firestore
          .collection('companyV2')
          .where('userId', '==', user.id)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              firestore.collection('companyV2').doc(doc.id).set(
                {
                  roleCredits: 5, // TODO: Make it dynamic
                },
                { merge: true }
              );
            });
          });
      });
    });
};

export default async (req, res) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const stripeSignature = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payload,
        stripeSignature,
        endpointSecret
      );
    } catch (error) {
      console.error('Error: ', error);
      res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      //   Fulfill the order
      return fulFillOrder(session)
        .then(() => res.status(200))
        .catch((error) =>
          res.status(400).send(`Webhook error: ${error.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// example session response
const res = {
  id: 'cs_test_a19uI37vYevmAhqLnuomrG1P5zUoErDRsCDZIK5oAwL2kxbsVjLsRwnJZG',
  object: 'checkout.session',
  after_expiration: null,
  allow_promotion_codes: false,
  amount_subtotal: 18800,
  amount_total: 18800,
  automatic_tax: { enabled: false, status: null },
  billing_address_collection: 'required',
  cancel_url: 'http://localhost:3000',
  client_reference_id: null,
  consent: null,
  consent_collection: null,
  created: 1665483886,
  currency: 'gbp',
  customer: 'cus_MZMzJP3WXO4hJ8',
  customer_creation: null,
  customer_details: {
    address: {
      city: 'Surat',
      country: 'IN',
      line1: '424242',
      line2: '',
      postal_code: '455455',
      state: 'Gujarat',
    },
    email: 'kinjal@loopnotluck.com',
    name: '4242',
    phone: null,
    tax_exempt: 'none',
    tax_ids: [],
  },
  customer_email: null,
  expires_at: 1665570286,
  livemode: false,
  locale: 'auto',
  metadata: {},
  mode: 'subscription',
  payment_intent: null,
  payment_link: null,
  payment_method_collection: 'always',
  payment_method_options: null,
  payment_method_types: ['card'],
  payment_status: 'paid',
  phone_number_collection: { enabled: false },
  recovered_from: null,
  setup_intent: null,
  shipping: null,
  shipping_address_collection: null,
  shipping_options: [],
  shipping_rate: null,
  status: 'complete',
  submit_type: null,
  subscription: 'sub_1LrfdnL0eJsZCFIwvYyYt2GW',
  success_url: 'http://localhost:3000',
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  url: null,
};
