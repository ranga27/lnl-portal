// const admin = require('firebase-admin');
const functions = require('firebase-functions/v1');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
const { applicantResultEmail } = require('./applicantResultEmail');

exports.applicantResults = functions
  .region('europe-west2')
  .runWith({ secrets: ['NODEMAILER_AUTH_PASSWORD'] })
  .https.onRequest(async (req, res) => {
    cors(req, res, async () => {
      const { email, firstName, companyName, status } = req.body;

      const transporter = nodemailer.createTransport({
        host: process.env.NODEMAILER_HOST_URL,
        port: process.env.NODEMAILER_PORT,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_AUTH_USER,
          pass: process.env.NODEMAILER_AUTH_PASSWORD,
        },
      });

      return applicantResultEmail({
        to: email,
        from: 'Loop Not Luck hello@loopnotluck.com',
        subject: `Results for your application to ${companyName}`,
        firstName,
        status,
        transporter,
        companyName,
      })
        .then(() => console.log('email sent!'))
        .catch((err) => console.log(err));
    });
  });
