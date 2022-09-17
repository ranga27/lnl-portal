const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// V2 functions in EU are only available in europe-west1
exports.confirmemail = onRequest(
  {
    region: "europe-west2",
  },
  async (req, res) => {
    const confirmationHash = req.query.conf;
    const auth = admin.auth();
    const store = admin.firestore();

    const querySnapshot = await store
      .collection("temporaryCompanyUsers")
      .where("confirmationHash", "==", confirmationHash)
      .get();
    if (querySnapshot.size === 0) {
      // TODO: change URL to reflect the portal URLs. Ideally this shouldn't be hardcoded
      return res.redirect(
        "https://lnl-portal.web.app/email-confirmation/failure"
      );
    }
    const temporaryUserDoc = querySnapshot.docs[0];
    const { uid, email, firstName, lastName, role } = temporaryUserDoc.data();
    await auth.updateUser(uid, { emailVerified: true });
    await store.collection("companyUsers").doc(uid).set({
      email,
      firstName,
      lastName,
      role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isOnboarded: false,
      hasCompletedProfile: false,
    });
    await store
      .collection("temporaryCompanyUsers")
      .doc(temporaryUserDoc.id)
      .delete();
    return res.redirect(
      "https://lnl-portal.web.app/email-confirmation/success"
    );
  }
);
