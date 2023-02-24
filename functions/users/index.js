const sendCompanyOnboardingEmail = require('./onboardingEmail');
const updateInviteCredits = require('./updateInviteCredits');
const fetchQuestions = require('./fetchQuestions');
const applicantResults = require('./applicantResults');

exports.sendCompanyOnboardingEmail =
  sendCompanyOnboardingEmail.sendCompanyOnboardingEmail;
exports.updateInviteCredits = updateInviteCredits.updateInviteCredits;
exports.fetchQuestions = fetchQuestions.fetchQuestions;
exports.applicantResults = applicantResults.applicantResults;
