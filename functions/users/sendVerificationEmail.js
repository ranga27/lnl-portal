const functions = require('firebase-functions/v1');
const { sendEmail } = require('./sendEmail');
const nodemailer = require('nodemailer');

exports.sendVerificationEmail = functions
  .region('europe-west2')
  .runWith({ secrets: ['NODEMAILER_AUTH_PASSWORD'] })
  .firestore.document('temporaryCompanyUsers/{uid}')
  .onCreate(async (snapshot) => {
    const tempUserInfo = snapshot.data();
    const { email, confirmationHash, firstName } = tempUserInfo;

    const transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST_URL,
      port: process.env.NODEMAILER_PORT,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    return sendEmail({
      to: email,
      from: 'Loop Not Luck hello@loopnotluck.com',
      subject: 'Click here to verify your email address - Get in the Loop',
      firstName,
      message: `${process.env.CONFIRM_URL}?conf=${confirmationHash}`,
      transporter,
    });
  });
