// const functions = require('firebase-functions/v1');
const { onCall } = require('firebase-functions/v2/https');
// const { sendEmail } = require('./sendOnboardingEmail');
const cors = require('cors')({ origin: true });

exports.sendonboardingemail = onCall(
  {
    region: 'europe-west2',
  },
  async (req, res) => {
    console.log(res);
    console.log(req);

    return sendEmail({
      to: req.body.data.userEmail,
      from: 'Loop Not Luck hello@loopnotluck.com',
      subject: 'Welcome to Loop Not Luck',
    });
  }
);

// exports.sendOnboardingEmail = functions.https.onCall((data) => {
//   console.log(data);
//   return sendEmail(data);
// });

// exports.sendOnboardingEmail = functions.https.onCall((req, res) => {
//   cors(req, res, () => {
//     return sendEmail(data);
//   });

//   // cloud function logic

//   res.json({ some: 'json' });
// });

async function sendEmail(newData) {
  console.log(newData);
}

// exports.sendOnboardingEmail = functions
//   .region('europe-west2')
//   .https.onCall(async (req, res) => {
//     cors(req, res, () => {
//     console.log(req);
//     return sendEmail({
//       to: req.body.data.userEmail,
//       from: 'Loop Not Luck hello@loopnotluck.com',
//       subject: 'Welcome to Loop Not Luck',
//     }); });
//   });
