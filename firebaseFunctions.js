const { join } = require('path');
const functions = require('firebase-functions');
const { default: next } = require('next');

const nextjsDistDir = join('src', require('./src/next.config').distDir);

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

exports.nextjsfunc = functions
  .region('europe-west2')
  .https.onRequest(async (req, res) => {
    await nextjsServer.prepare();
    return await nextjsHandle(req, res);
  });
