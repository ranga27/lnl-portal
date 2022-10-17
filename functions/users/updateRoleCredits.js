const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { buffer } = require('micro');

// Initialize stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.LISTEN_STRIPE_EVENTS_WEBHOOK_SIGNING_SECRET;

const fulFillOrder = async (session) => {
  const store = admin.firestore();

  return store
    .collection('companyUsers')
    .where('email', '==', session.customer_details.email)
    .get()
    .then((docs) => {
      docs.forEach((user) => {
        store
          .collection('companyV2')
          .where('userId', '==', user.id)
          .get()
          .then((docs) => {
            docs.forEach((doc) => {
              store.collection('companyV2').doc(doc.id).set(
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

exports.updaterolecredits = onRequest(
  {
    region: 'europe-west2',
  },
  async (req, res) => {
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
);
