const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.confirmEmail = functions.https.onRequest(async (req, res) => {
  const confirmationHash = req.query.conf;
  const auth = admin.auth();
  const store = admin.firestore();

  const querySnapshot = await store
    .collection('temporaryUsers')
    .where('confirmationHash', '==', confirmationHash)
    .get();
  if (querySnapshot.size === 0) {
    return res.redirect('https://loop-luck.web.app/email-confirmation/failure');
  }
  const temporaryUserDoc = querySnapshot.docs[0];
  const { uid, email, fullName, role } = temporaryUserDoc.data();
  await auth.updateUser(uid, { emailVerified: true });
  await store.collection('users').doc(uid).set({
    email,
    fullName,
    role,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isOnboarded: false,
    hasCompletedProfile: false,
  });
  await store.collection('temporaryUsers').doc(temporaryUserDoc.id).delete();
  return res.redirect('https://loop-luck.web.app/email-confirmation/success');
});
