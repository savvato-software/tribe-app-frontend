// check to see if attributes page exists
describe('check for existence of attributes page', () => {
  // get to attributes page
  it('navigate to attributes page', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="sign-in-btn"]').click()
    
    cy.get('[data-test="launchAttributesPageButton"]').should('have.length', 1)
    cy.get('[data-test="launchAttributesPageButton"]').click()
  })

  // check to see if the 4 attributes columns exist on the attributes page

  it('should display the four columns', () => {
    // Assert that the four columns exist in the grid
    cy.get('ion-grid').within(() => {
      cy.get('ion-row.header-row')
        .should('contain', 'Adverb')
        .and('contain', 'Verb')
        .and('contain', 'Preposition')
        .and('contain', 'Noun')
    })
  }) 

  

  // check if the four input fields exist on the create attributes page
  it('check to see if the four edit fields exist', () => {

    cy.get('[data-test="launchHeaderPrimaryActionButton"]').should('have.length', 1)
    cy.get('[data-test="launchHeaderPrimaryActionButton"]').click()

    cy.get('[data-test="inputAdverbField"]').should('have.length', 1)
    cy.get('[data-test="inputVerbField"]').should('have.length', 1)
    cy.get('[data-test="inputPrepositionField"]').should('have.length', 1)
    cy.get('[data-test="inputNounField"]').should('have.length', 1)
    
  })

  // check for reactivity for inputAdverbField, click submit button, read value, click success button
  it('check for reactivity from adverb input field', () => {
    cy.get('[data-test="inputAdverbField"]').type('competetively')

        cy.get('[data-test="inputAdverbField"]').should('have.value', 'competetively')
    
  })

    it('check for reactivity from verb input field', () => {
      cy.get('[data-test="inputVerbField"]').type('writes')

    cy.get('[data-test="inputVerbField"]').should('have.value', 'writes')
  })

  // check for reactivity for inputPrepositionField, click submit button, read value, click success button
    it('check for reactivity from preposition input field', () => {
      cy.get('[data-test="inputPrepositionField"]').type('watermelon')

    cy.get('[data-test="inputPrepositionField"]').should('have.value', 'watermelon')

  })


    it('check for reactivity from noun input field', () => {
       cy.get('[data-test="inputNounField"]').type('code')

    cy.get('[data-test="inputNounField"]').should('have.value', 'code')

  })

  // check to see if the submit button exists
  it('check reactivity of submit button success', () => {

    cy.get('[data-test="submitAttributesButton"]').should('have.length', 1)

      // press submit button
      cy.get('[data-test="submitAttributesButton"]').click()

    // Assert that the success message is displayed
      cy.contains('ion-alert', 'Success!').should('exist');

       cy.wait(500); cy.get('button').click()
  })

})
