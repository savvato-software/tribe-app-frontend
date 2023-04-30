describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login')
    })

    it('checks reactivity of sign in email address and password and clicks the sign in button', () => {
        cy.get('[data-test="emailaddress-input"]').type("testuser@tribeapp.com")
        cy.get('[data-test="password-input"]').type("admin")
        cy.get('[data-test="sign-in-btn"]').click()

  })

    it('visits the login page and clicks the create new user button', () => {
     cy.get('[data-test="create-new-user-btn"]').click()

  })

    it('visits the login page and clicks the forgot password button', () => {
     cy.get('[data-test="forgot-password-btn"]').click()

  })


})