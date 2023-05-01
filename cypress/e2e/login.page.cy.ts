describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login')
    })

    it('checks reactivity of sign in email address and password and clicks the sign in button', () => {
        cy.get('[data-test="emailaddress-input"]')
        cy.get('[data-test="password-input"]')
        cy.get('[data-test="sign-in-btn"]').click()
        cy.url().should('eq', 'http://localhost:8100/home')

  })

    it('visits the login page and clicks the create new user button', () => {
     cy.get('[data-test="create-new-user-btn"]').click()

  })

    it('visits the login page and clicks the forgot password button', () => {
     cy.get('[data-test="forgot-password-btn"]').click()

  })


})