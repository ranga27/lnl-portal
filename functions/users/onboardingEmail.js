const { sendEmail } = require('./sendOnboardingEmail');
const functions = require('firebase-functions/v1');
const nodemailer = require('nodemailer');

exports.sendOnboardingEmail = functions
  .region('europe-west2')
  .runWith({ secrets: ['NODEMAILER_AUTH_PASSWORD'] })
  .firestore.document('companyUsers/{userId}')
  .onUpdate((change) => {
    const after = change.after.data();
    const isOnboarded = after.isOnboarded;
    const email = after.email;

    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST_URL,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    if (isOnboarded === true) {
      return sendEmail({
        to: email,
        from: 'Loop Not Luck hello@loopnotluck.com',
        subject: 'Welcome to Loop Not Luck',
        transporter,
      })
        .then(() => console.log('email sent!'))
        .catch((err) => console.log(err));
    }
  });
