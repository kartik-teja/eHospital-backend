// cypress/support/e2e.js

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Cypress configurations
Cypress.Screenshot.defaults({
    screenshotOnRunFailure: true,
    capture: 'runner'
});

// Hooks
before(() => {
    // Runs once before all tests
    cy.log('Global Before Hook');
});

beforeEach(() => {
    // Runs before each test
    cy.log('Global BeforeEach Hook');
});

after(() => {
    // Runs once after all tests
    cy.log('Global After Hook');
});

afterEach(() => {
    // Runs after each test
    cy.log('Global AfterEach Hook');
});

// Add custom commands
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login');
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('form').submit();
});

Cypress.Commands.add('logout', () => {
    cy.get('button#logout').click();
});

// Error handling
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});
