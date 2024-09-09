describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login')
    })

    it('checks reactivity of sign in email address and password and clicks the sign in button', () => {
        cy.get('[data-test="emailaddress-input"]').click();
        cy.get('[data-test="emailaddress-input"] input').clear();
        cy.get('[data-test="emailaddress-input"] input').focus();
        cy.get('[data-test="emailaddress-input"] input').type("testuser@tribeapp.com")
        cy.get('[data-test="password-input"]').click();
        cy.get('[data-test="password-input"] input').clear();
        cy.get('[data-test="password-input"] input').focus();
        cy.get('[data-test="password-input"] input').type("admin")
        cy.get('[data-test="sign-in-btn"]').should('exist')
        // cy.url().should('eq', 'http://localhost:8100/home')

        // TODO: Get the mocked api calls a la connect page or attributes page working here, too.
  })


})
