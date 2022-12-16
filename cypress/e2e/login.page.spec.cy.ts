describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8100/login')
  })

  xit('press sign in button to bring up home page', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="submitButton"]').click()
    
    cy.get('[data-test="launchAttributesPageButton"]').should('have.length', 1)
    cy.get('[data-test="launchAttributesPageButton"]').click()
  })

  

   


  

})