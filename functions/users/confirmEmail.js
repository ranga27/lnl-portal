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
    // TODO: change URL to reflect the portal URLs. Ideally this shouldn't be hardcoded
    return res.redirect(
      'https://lnl-portal.web.app/email-confirmation/failure'
    );
  }
  const temporaryUserDoc = querySnapshot.docs[0];
  const { uid, email, firstName, lastName, role } = temporaryUserDoc.data();
  await auth.updateUser(uid, { emailVerified: true });
  await store.collection('companyUsers').doc(uid).set({
    email,
    firstName,
    lastName,
    role,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    isOnboarded: false,
    hasCompletedProfile: false,
  });
  await store.collection('temporaryUsers').doc(temporaryUserDoc.id).delete();
  return res.redirect('https://lnl-portal.web.app/email-confirmation/success');
});
