const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    supportFile: false, // no need for support file
    baseUrl: 'http://localhost:3000', // url
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});