const { onCall } = require('firebase-functions/v2/https');
const { sendEmail } = require('./sendOnboardingEmail');
const cors = require('cors')({ origin: true });

exports.sendonboardingemail = onCall(
  {
    region: 'europe-west2',
  },
  (data) => {
    return sendEmail({
      to: data.data.email,
      from: 'Loop Not Luck hello@loopnotluck.com',
      subject: 'Welcome to Loop Not Luck',
    });
  }
);
