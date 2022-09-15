const { join } = require("path");
const { https } = require("firebase-functions");
const { default: next } = require("next");
// The goal is to host the Next.js app on Firebase Cloud Functions with Firebase Hosting rewrite rules so our app is served from our Firebase Hosting URL. Each individual page bundle is served in a new call to this Cloud Function which performs the initial server render.
const nextjsDistDir = join("src", require("./src/next.config").distDir);

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsFunc = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});
