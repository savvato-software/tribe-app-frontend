describe('check for inputs and buttons on review attributes page', () => {

    // get to review attributes page
    it('navigate to review attributes page', () => {
        cy.visit('http://localhost:8100/login')
        cy.get('[data-test="sign-in-btn"]').click()

        cy.get('[data-test="launchToBeReviewedPageButton"]').should('have.length', 1)
        cy.get('[data-test="launchToBeReviewedPageButton"]').click()
    })

})