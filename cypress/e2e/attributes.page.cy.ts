// check to see if attributes page exists
describe('check for existence of attributes page', () => {
  // get to attributes page
  it('navigate to attributes page', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="sign-in-btn"]').click()
    
    cy.contains('ion-item', 'Attributes').click();
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

  // Type phrase that passes and check for success message
    it('type into verb input field', () => {
       cy.wait(500); 
      cy.get('[data-test="inputVerbField"]').type('sculpts')

    // read value from output field
    cy.get('[data-test="inputVerbField"]').should('have.value', 'sculpts')

  })

    it('type into preposition input field', () => {
      //  cy.wait(500); 
      cy.get('[data-test="inputPrepositionField"]').type('with')
    
    cy.get('[data-test="inputPrepositionField"]').should('have.value', 'with')

  })

    it('type into noun input field', () => {
      //  cy.wait(500); 
       cy.get('[data-test="inputNounField"]').type('clay')

        // read value from output field
    cy.get('[data-test="inputNounField"]').should('have.value', 'clay')

  })

  // check to see if success message appears
  it('check reactivity of submit button success', () => {

    cy.get('[data-test="submitAttributesButton"]').should('have.length', 1)

      // press submit button
      cy.get('[data-test="submitAttributesButton"]').click()

    // Assert that the success message is displayed
      cy.contains('ion-alert', 'Success!').should('exist');

   
// clear success button
       cy.wait(500); cy.get('button').click()


  })

    // Type phrase that fails and check for failure message
    it('navigates to create page', () => {

      cy.get('[data-test="launchHeaderPrimaryActionButton"]').should('have.length', 1)
      cy.get('[data-test="launchHeaderPrimaryActionButton"]').click()
    })

    it('type into verb input field', () => {
      cy.get('[data-test="inputVerbField"]').type('your')

    // read value from output field
    cy.get('[data-test="inputVerbField"]').should('have.value', 'your')

  })

  it('type into noun input field', () => {
    //  cy.wait(500); 
     cy.get('[data-test="inputNounField"]').type('mom')

      // read value from output field
  cy.get('[data-test="inputNounField"]').should('have.value', 'mom')

})

// check to see if failure message appears
it('check reactivity of submit button failure', () => {

  cy.get('[data-test="submitAttributesButton"]').should('have.length', 1)

    // press submit button
    cy.get('[data-test="submitAttributesButton"]').click()

  // Assert that the In Review message is displayed
    cy.contains('ion-alert', 'In Review').should('exist');

 
// clear success button
     cy.wait(500); cy.get('button').click()


})

})
