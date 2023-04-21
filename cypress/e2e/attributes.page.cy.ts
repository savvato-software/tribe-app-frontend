// check to see if attributes page exists
describe('check for existence of attributes page', () => {
  // get to attributes page
  it('navigate to attributes page', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="submitButton"]').click()
    
    cy.get('[data-test="launchAttributesPageButton"]').should('have.length', 1)
    cy.get('[data-test="launchAttributesPageButton"]').click()
  })

  // Requirement is that for each field the value in the field should be copied to output when you click the field's button
  // I am using a single variable and should be using multiple variables
  // Test - deeper cases - off the happy path 

  // check for four input fields 
  // typing something in one of those fields and then hit a button then read value from read only field and compare that value to what was typed into that field
  
  // check if the four fields exist on the attributes page
  // How do I check to see if they exist on the attributes page
  it('check to see if the four fields exist', () => {

    cy.get('[data-test="launchCreateButton"]').should('have.length', 1)
    cy.get('[data-test="launchCreateButton"]').click()

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

})