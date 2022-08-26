const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1300,
  viewportHeight: 1000,
  defaultCommandTimeout: 100000,
  requestTimeout: 100000,
  responseTimeout: 100000,
  pageLoadTimeout: 100000,
  video: false,
  env: {
    ENVIRONMENT: 'local',
    LOOP_URL: 'http://localhost:3000',
    USER_EMAIL: 'abraham+1@loopnotluck.com',
    USER_PASSWORD: '12345678',
    DOMAIN_NAME: 'localhost',
    secureCookie: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
