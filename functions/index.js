/* eslint object-curly-spacing: ["error", "always"]*/
const admin = require("firebase-admin");
const sendVerificationEmail = require("./users/sendVerificationEmail");
const confirmEmail = require("./users/confirmEmail");
admin.initializeApp();

// Grouping fucntions to do targetted partial deployment. This will help separating the Root SSR Function from the Functions in the /functions folder.
exports.emailGroup = {
  sendVerificationEmail: sendVerificationEmail.sendVerificationEmail,
  confirmEmail: confirmEmail.confirmEmail,
};
