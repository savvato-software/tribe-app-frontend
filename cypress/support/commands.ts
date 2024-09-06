/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('appLogin', () => {
    cy.intercept('POST', 'http://localhost:8080/api/public/login', (req) => {
        req.reply({
            statusCode: 200,
            headers: {
                "Authorization": "Bearer ey",
            },
            body: {
                "id": 12345,
                "name": "testuser",
                "password": "$2a$10$wGcNuV0Kodg7uz6qI/l/1uz1mMcpmAGZqfuZ3JxY9cAeejtYXUbWC",
                "phone": "3035551213",
                "email": "testuser@tribeapp.com",
                "enabled": 1,
                "roles": [{"id": 2, "name": "ROLE_accountholder"}],
                "created": 1724528143000,
                "lastUpdated": 1724528143000
            }
        });
    }).as('login');

    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="sign-in-btn"]').click()

    cy.wait('@login');
});

