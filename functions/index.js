/* eslint object-curly-spacing: ["error", "always"]*/
const admin = require("firebase-admin");
const sendVerificationEmail = require("./users/sendVerificationEmail");
const confirmEmail = require("./users/confirmEmail");
admin.initializeApp();

exports.sendVerificationEmail = sendVerificationEmail.sendVerificationEmail;
exports.confirmEmail = confirmEmail.confirmEmail;
