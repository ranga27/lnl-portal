const { sendEmail } = require('./sendOnboardingEmail');
const functions = require('firebase-functions/v1');

exports.sendonboardingemail = functions.firestore
  .document('companyUsers/{userId}')
  .onUpdate((change) => {
    const after = change.after.data();
    const isOnboarded = after.isOnboarded;
    const email = after.email;

    if (isOnboarded === true) {
      return sendEmail({
        to: email,
        from: 'Loop Not Luck hello@loopnotluck.com',
        subject: 'Welcome to Loop Not Luck',
      })
        .then(() => console.log('email sent!'))
        .catch((err) => console.log(err));
    }
  });
