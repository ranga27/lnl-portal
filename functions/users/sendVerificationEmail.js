// Firestore Triggers are not yet available in V2
const functions = require('firebase-functions/v1');
const { sendEmail } = require('./sendEmail');

exports.sendVerificationEmail = functions
  .region('europe-west2')
  .firestore.document('temporaryCompanyUsers/{uid}')
  .onCreate(async (snapshot) => {
    const tempUserInfo = snapshot.data();
    const { email, confirmationHash, firstName } = tempUserInfo;

    return sendEmail({
      to: email,
      from: 'Loop Not Luck hello@loopnotluck.com',
      subject: 'Click here to verify your email address - Get in the Loop',
      firstName,
      // TODO: change URL to reflect the portal URLs. Ideally this shouldn't be hardcoded
      message: `${process.env.CONFIRM_URL}?conf=${confirmationHash}`,
    });
  });
