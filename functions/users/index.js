const sendVerificationEmail = require('./sendVerificationEmail');
const confirmEmail = require('./confirmEmail');
const sendonboardingemail = require('./onboardingEmail');

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmemail = confirmEmail.confirmemail;
exports.sendonboardingemail = sendonboardingemail.sendonboardingemail;
