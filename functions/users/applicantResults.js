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
      const { email, firstName, companyName, status, customMessage } = req.body;

      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 465,
        secure: true,
        auth: {
          user: 'sarang@loopnotluck.com',
          pass: '0MU6cxAR5wYsvZFD',
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
        customMessage,
      })
        .then(() => console.log('email sent!'))
        .catch((err) => console.log(err));
    });
  });
