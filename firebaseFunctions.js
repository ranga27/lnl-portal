const { join } = require("path");
const { onRequest } = require("firebase-functions/v2/https");
const { default: next } = require("next");
/* The goal is to host the Next.js app on Firebase Cloud Functions with Firebase Hosting rewrite rules so our app is served from our Firebase Hosting URL. 
Each individual page bundle is served in a new call to this Cloud Function which performs the initial server render. */
const nextjsDistDir = join("src", require("./src/next.config").distDir);

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsfunc = onRequest(async (req, res) => {
  await nextjsServer.prepare();
  return await nextjsHandle(req, res);
});
