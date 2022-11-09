describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="create-new-user-btn"]').click()

    cy.get(".new-user-page-content ion-input").should('have.length', 5)
  })

  it('')
})