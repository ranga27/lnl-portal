/* eslint object-curly-spacing: ["error", "always"]*/
const { initializeApp } = require("firebase-admin/app");
initializeApp();

exports.users = require("./users/index");
