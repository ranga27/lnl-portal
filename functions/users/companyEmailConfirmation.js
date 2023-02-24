const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');

exports.companyEmailConfirmation = functions
  .region('europe-west2')
  .https.onRequest(async (req, res) => {
    const confirmationHash = req.query.conf;
    console.log(confirmationHash, 'conf HAsh');
    const auth = admin.auth();
    const store = admin.firestore();

    const querySnapshot = await store
      .collection('temporaryCompanyUsers')
      .where('confirmationHash', '==', confirmationHash)
      .get();
    if (querySnapshot.size === 0) {
      return res.redirect(`${process.env.FAILURE_COMPANY_URL}`);
    }
    const temporaryUserDoc = querySnapshot.docs[0];
    const { uid, email, firstName, lastName, role } = temporaryUserDoc.data();
    await auth.updateUser(uid, { emailVerified: true });
    await store.collection('companyUsers').doc(uid).set({
      email,
      firstName,
      lastName,
      role,
      createdAt: FieldValue.serverTimestamp(),
      isOnboarded: false,
      hasCompletedProfile: false,
    });
    await store
      .collection('temporaryCompanyUsers')
      .doc(temporaryUserDoc.id)
      .delete();
    return res.redirect(`${process.env.SUCCESS_COMPANY_URL}`);
  });
