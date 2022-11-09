describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8100/login')
  })

  it('press sign in button to bring up home page', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="submitButton"]').click()
    cy.get('[data-test="launchAttributesPageButton"]').should('have.length', 1)
    cy.get('[data-test="launchAttributesPageButton"]').click()
    // get to attributes page
    // check for four input fields 
    // typing something in one of those fields and then hit a button then read value from read only field and compare that value to what was typed into that field

  })
})