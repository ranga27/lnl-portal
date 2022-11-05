const sendVerificationEmail = require('./sendVerificationEmail');
const confirmEmail = require('./confirmEmail');
const sendonboardingemail = require('./onboardingEmail');
const updateRoleCredits = require('./updateRoleCredits');

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmEmail = confirmEmail.confirmEmail;
exports.sendonboardingemail = sendonboardingemail.sendonboardingemail;
exports.updateRoleCredits = updateRoleCredits.updateRoleCredits;
