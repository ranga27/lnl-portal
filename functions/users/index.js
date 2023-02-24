const confirmCompanyEmail = require('./confirmCompanyEmail');
const sendCompanyOnboardingEmail = require('./onboardingEmail');
const updateInviteCredits = require('./updateInviteCredits');
const fetchQuestions = require('./fetchQuestions');
const applicantResults = require('./applicantResults');
const {
  sendCompanyVerificationEmail,
} = require('./sendCompanyVerificationEmail');
const { companyEmailConfirmation } = require('./companyEmailConfirmation');

exports.sendCompanyVerificationEmail =
  sendCompanyVerificationEmail.sendCompanyVerificationEmail;
exports.confirmCompanyEmail = confirmCompanyEmail.confirmCompanyEmail;
exports.sendCompanyOnboardingEmail =
  sendCompanyOnboardingEmail.sendCompanyOnboardingEmail;
exports.updateInviteCredits = updateInviteCredits.updateInviteCredits;
exports.fetchQuestions = fetchQuestions.fetchQuestions;
exports.applicantResults = applicantResults.applicantResults;
exports.sendCompanyVerificationEmail = sendCompanyVerificationEmail;
exports.companyEmailConfirmation = companyEmailConfirmation;
