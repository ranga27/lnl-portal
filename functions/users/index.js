const sendVerificationEmail = require('./sendVerificationEmail');
const confirmEmail = require('./confirmEmail');
const sendonboardingemail = require('./onboardingEmail');
const updateRoleCredits = require('./updateRoleCredits');

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmemail = confirmEmail.confirmemail;
exports.sendonboardingemail = sendonboardingemail.sendonboardingemail;
exports.updaterolecredits = updateRoleCredits.updaterolecredits;
