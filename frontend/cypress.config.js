const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', //  app's URL
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // tests are located
    supportFile: 'cypress/support/e2e.js', // support file (beforeEach, custom commands)
    viewportWidth: 1280, // browser width
    viewportHeight: 720, // browser height
    video: false, // disable video recording (can be enabled in CI)
    setupNodeEvents(on, config) {
      // todo: plugins or node event listeners?rs
    },
  },
});