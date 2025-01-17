const admin = require('firebase-admin');
const { sendStripeEmail } = require('./sendStripeEmail');
const functions = require('firebase-functions/v1');
const nodemailer = require('nodemailer');

const getInviteCredits = (amount) => {
  switch (true) {
    case amount / 100 === 79:
      return 1;
    case amount / 100 === 250:
      return 5;
    case amount / 100 === 500:
      return 10;
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
                    inviteCredits:
                      doc.data().inviteCredits +
                      getInviteCredits(session.amount_subtotal),
                  },
                  { merge: true }
                );
            });
          });
      });
    });
};

exports.updateInviteCredits = functions
  .region('europe-west2')
  .runWith({
    secrets: [
      'LISTEN_STRIPE_EVENTS_WEBHOOK_SIGNING_SECRET',
      'STRIPE_SECRET_KEY',
    ],
  })
  .https.onRequest(async (req, res) => {
    const endpointSecret =
      process.env.LISTEN_STRIPE_EVENTS_WEBHOOK_SIGNING_SECRET;

    const payloadData = req.rawBody;
    const payloadString = payloadData.toString();
    const webhookStripeSignatureHeader = req.headers['stripe-signature'];
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST_URL,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

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
            credits: getInviteCredits(session.amount_subtotal),
            transporter,
          });
          return res.sendStatus(200);
        })
        .catch((error) =>
          res.status(400).send(`Webhook error: ${error.message}`)
        );
    }
  });
