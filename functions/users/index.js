const sendVerificationEmail = require("./sendVerificationEmail");
const confirmEmail = require("./confirmEmail");
const sendOnboardingEmail = require("./onboardingEmail");

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmemail = confirmEmail.confirmemail;
exports.sendonboardingemail = sendOnboardingEmail.sendonboardingemail;
