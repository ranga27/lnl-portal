const admin = require('firebase-admin');
const functions = require('firebase-functions/v1');
const cors = require('cors')({ origin: true });

exports.fetchQuestions = functions
  .region('europe-west2')
  .https.onRequest(async (req, res) => {
    cors(req, res, async () => {
      const { companyId } = req.query;

      const store = admin.firestore();

      let questions = [];

      await store
        .collection('questionnaire')
        .where('companyId', '==', companyId)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            questions.push({ ...doc.data(), id: doc.id });
            questions = doc.data().questions;
          });
        });

      return res.status(200).json(questions);
    });
  });
