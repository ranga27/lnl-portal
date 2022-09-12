const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { sendEmail } = require('./sendEmail');

exports.sendVerificationEmail = functions.firestore
  .document('temporaryUsers/{uid}')
  .onCreate(async (snapshot, context) => {
    const uid = context.params.uid;
    const querySnapshot = await admin
      .firestore()
      .collection('temporaryUsers')
      .doc(uid)
      .get();
    console.log('Testing for user: ', querySnapshot.data());
    const tempUserInfo = snapshot.data();
    const { email, confirmationHash, firstName, lastName } = tempUserInfo;

    return sendEmail({
      to: email,
      from: 'Loop Not Luck hello@loopnotluck.com',
      subject: 'Click here to verify your email address - Get in the Loop',
      firstName,
      lastName,
      message: `https://us-central1-loop-luck.cloudfunctions.net/confirmEmail?conf=${confirmationHash}`,
    });
  });
