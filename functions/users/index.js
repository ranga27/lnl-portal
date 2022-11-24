const sendVerificationEmail = require('./sendVerificationEmail');
const confirmEmail = require('./confirmEmail');
const sendOnboardingEmail = require('./onboardingEmail');
const updateRoleCredits = require('./updateRoleCredits');
const fetchQuestions = require('./fetchQuestions');

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendOnboardingEmail = sendOnboardingEmail.sendOnboardingEmail;
exports.updateRoleCredits = updateRoleCredits.updateRoleCredits;
exports.fetchQuestions = fetchQuestions.fetchQuestions;
