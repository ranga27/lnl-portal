const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const { sendStripeEmail } = require('./sendStripeEmail');

const getRoleCredits = (amount) => {
  switch (true) {
    case amount / 100 === 688:
      return 20;
    case amount / 100 === 354:
      return 10;
    case amount / 100 === 188:
      return 5;
    case amount / 100 === 500:
      return 1;
    case amount / 100 === 2250:
      return 5;
    case amount / 100 === 4250:
      return 10;
    case amount / 100 === 8250:
      return 20;
    default:
      return 0;
  }
};

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
              store
                .collection('companyV2')
                .doc(doc.id)
                .set(
                  {
                    roleCredits: getRoleCredits(session.amount_subtotal),
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
    const endpointSecret = process.env.LISTEN_STRIPE_EVENTS_WEBHOOK_SIGNING_SECRET

    const payloadData = req.rawBody;
    const payloadString = payloadData.toString();
    const webhookStripeSignatureHeader = req.headers['stripe-signature'];
    const stripe = require('stripe')(
      process.env.STRIPE_SECRET_KEY
    );

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        payloadString,
        webhookStripeSignatureHeader,
        endpointSecret
      );
    } catch (error) {
      console.error('Error: ', error);
      res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      return fulFillOrder(session)
        .then(() => {
          sendStripeEmail({
            to: session.customer_details.email,
            from: 'Loop Not Luck hello@loopnotluck.com',
            subject: 'Loop Not Luck Credits bought successfully!',
            credits: getRoleCredits(session.amount_subtotal),
          });
          return res.sendStatus(200);
        })
        .catch((error) =>
          res.status(400).send(`Webhook error: ${error.message}`)
        );
    }
  }
);
