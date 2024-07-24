const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        },
        baseUrl: 'http://localhost:4000', // base URL for your application
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // pattern to match test files
        supportFile: false,
    },
})
