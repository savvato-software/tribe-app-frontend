describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login')
    })

    it('visits the login page and clicks the create new user button', () => {
     cy.get('[data-test="create-new-user-btn"]').click()

  })


})