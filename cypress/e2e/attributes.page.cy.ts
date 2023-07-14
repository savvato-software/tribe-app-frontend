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

    cy.get('[data-test="primaryActionButtonDataTestSelectorText"]').should('have.length', 1)
    cy.get('[data-test="primaryActionButtonDataTestSelectorText"]').click()

    cy.get('[data-test="inputAdverbField"]').should('have.length', 1)
    cy.get('[data-test="inputVerbField"]').should('have.length', 1)
    cy.get('[data-test="inputPrepositionField"]').should('have.length', 1)
    cy.get('[data-test="inputNounField"]').should('have.length', 1)
    
  })

  // check for reactivity for inputAdverbField, click submit button, read value, click success button
  it('check for reactivity from adverb input field', () => {
    cy.get('[data-test="inputAdverbField"]').type('banana')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
        cy.get('[data-test="inputAdverbField"]').should('have.value', 'banana')

    // clear success button
        cy.get('button').click()
    
  })

  // check for reactivity for inputVerbField, click submit button, read value, click success button
    it('check for reactivity from verb input field', () => {
       cy.wait(500); cy.get('[data-test="inputVerbField"]').type('apple')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
    cy.get('[data-test="inputVerbField"]').should('have.value', 'apple')

    // clear success button
        cy.get('button').click()

  })

  // check for reactivity for inputPrepositionField, click submit button, read value, click success button
    it('check for reactivity from preposition input field', () => {
       cy.wait(500); cy.get('[data-test="inputPrepositionField"]').type('watermelon')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
    
    cy.get('[data-test="inputPrepositionField"]').should('have.value', 'watermelon')

    // clear success button
        cy.get('button').click()

  })

  // check for reactivity for inputNounField, click submit button, read value, click success button
    it('check for reactivity from noun input field', () => {
       cy.wait(500); cy.get('[data-test="inputNounField"]').type('strawberry')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
    cy.get('[data-test="inputNounField"]').should('have.value', 'strawberry')

// clear success button
        cy.get('button').click()

  })

  // check to see if the submit button exists
  it('check to see if the submit button exists', () => {

    cy.get('[data-test="submitAttributesButton"]').should('have.length', 1)

  })


  // check to see if the new attributes are displayed in the grid on the attributes page

})