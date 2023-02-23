// const admin = require('firebase-admin');
const functions = require('firebase-functions/v1');
const cors = require('cors')({ origin: true });
const nodemailer = require('nodemailer');
const { applicantAcceptanceEmail } = require('./applicantAcceptanceEmail');
const { applicantRejectedEmail } = require('./applicantRejectedEmail');

exports.applicantResults = functions
  .region('europe-west2')
  .runWith({ secrets: ['NODEMAILER_AUTH_PASSWORD'] })
  .https.onRequest(async (req, res) => {
    cors(req, res, async () => {
      const {
        email,
        firstName,
        companyName,
        status,
        customMessage,
        roleName,
        hiringManagerEmail,
      } = req.body;

      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.sendinblue.com',
        port: 465,
        secure: true,
        auth: {
          user: 'sarang@loopnotluck.com',
          pass: '0MU6cxAR5wYsvZFD',
        },
      });
      if (status === 'Accepted') {
        return applicantAcceptanceEmail({
          to: email,
          from: 'Loop Not Luck hello@loopnotluck.com',
          subject: `The result for your application on Loop Not Luck’s online career portal to ${companyName}`,
          firstName,
          status,
          transporter,
          companyName,
          customMessage,
          roleName,
          cc: hiringManagerEmail,
        })
          .then(() => console.log('email sent!'))
          .catch((err) => console.log(err));
      } else {
        return applicantRejectedEmail({
          to: email,
          from: 'Loop Not Luck hello@loopnotluck.com',
          subject: `The result for your application on Loop Not Luck’s online career portal to ${companyName}`,
          firstName,
          status,
          transporter,
          companyName,
          customMessage,
          roleName,
          cc: hiringManagerEmail,
        })
          .then(() => console.log('email sent!'))
          .catch((err) => console.log(err));
      }
    });
  });
