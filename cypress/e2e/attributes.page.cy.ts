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

  // check for reactivity for read only output field from adverb input field
  it('check for reactivity for read only output field from adverb input field', () => {
    cy.get('[data-test="inputAdverbField"]').type('banana')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
        cy.get('[data-test="inputAdverbField"]').should('have.value', 'banana')

    // clear success button
        cy.get('button').click()
    
  })

  // check for reactivity for read only output field from verb input field
  it('check for reactivity for read only output field from verb input field', () => {
        cy.get('[data-test="inputVerbField"]').type('aapple')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
    cy.get('[data-test="inputVerbField"]').should('have.value', 'apple')

    // clear success button
        cy.get('button').click()

  })

  // check for reactivity for read only output field from preposition input field
  it('check for reactivity for read only output field from preposition input field', () => {

        cy.get('[data-test="inputPrepositionField"]').type('wwatermelon')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
    
    cy.get('[data-test="inputPrepositionField"]').should('have.value', 'watermelon')

    // clear success button
        cy.get('button').click()

  })

  // check for reactivity for read only output field from noun input field
  it('check for reactivity for read only output field from noun input field', () => {

    cy.get('[data-test="inputNounField"]').type('sstrawberry')

    // press the button
    cy.get('[data-test="submitAttributesButton"]').click()

    // read value from output field
    cy.get('[data-test="inputNounField"]').should('have.value', 'strawberry')

  })

  // check to see if the submit button exists
  it('check to see if the submit button exists', () => {

    cy.get('[data-test="submitAttributesButton"]').should('have.length', 1)

  })

// Not happy path test by Johnathan James
// get the value from the input field
// Hi Sun.. sorry I am just seeing this now, but you would enter a value in the first 
// input field, then press it's button. 
// That will copy the text to the read only field. 
// Enter something in the second field, press it's button.. the value is copied. 
// Then delete the value in the second field, and press the button of the first field. 
// The read only field is cleared. It should instead show the value of the first field.
it('not happy path one', () => {
  cy.reload()

  //enter a value in the first input field
   cy.get('[data-test="inputAdverbField"]').type('cake')
   // then press it's button. 
   cy.get('[data-test="inputAdverbButton"]').click()
   // the value is copied. 
   cy.get('[data-test="outputField"]').should('have.value', 'cake')

   // Enter something in the second field 
  cy.get('[data-test="inputVerbField"]').type('chocolate')
  // press it's button..
  cy.get('[data-test="inputVerbButton"]').click()
  // the value is copied.
  cy.get('[data-test="outputField"]').should('have.value', 'chocolate')

  // Then delete the value in the second field 
  cy.get('[data-test="inputVerbField"]').invoke('val', ' ')
  // press the button of the first field. 
  cy.get('[data-test="inputAdverbButton"]').click()
  // The read only field is cleared.
  // cy.get('[data-test="outputField"]').should('have.value', '')
  
  // It should instead show the value of the first field.
  cy.get('[data-test="outputField"]').should('have.value', 'cake')

})

})