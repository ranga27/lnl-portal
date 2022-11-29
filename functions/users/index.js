const sendVerificationEmail = require('./sendVerificationEmail');
const confirmEmail = require('./confirmEmail');
const sendOnboardingEmail = require('./onboardingEmail');
const updateInviteCredits = require('./updateInviteCredits');
const fetchQuestions = require('./fetchQuestions');
const applicantResults = require('./applicantResults');

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendOnboardingEmail = sendOnboardingEmail.sendOnboardingEmail;
exports.updateInviteCredits = updateInviteCredits.updateInviteCredits;
exports.fetchQuestions = fetchQuestions.fetchQuestions;
exports.applicantResults = applicantResults.applicantResults;
