describe('empty spec', () => {
 
  // check to see if attributes page exists
  // get to attributes page
  it('navigate to attributes page', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="submitButton"]').click()
    
    cy.get('[data-test="launchAttributesPageButton"]').should('have.length', 1)
    cy.get('[data-test="launchAttributesPageButton"]').click()
  })

  // check for four input fields 
  // typing something in one of those fields and then hit a button then read value from read only field and compare that value to what was typed into that field
  
  // check if the four fields exist on the attributes page
  // How do I check to see if they exist on the attributes page
  it('check to see if the four fields exist', () => {
    cy.get('[data-test="inputAdverbField"]').should('have.length', 1)
    cy.get('[data-test="inputVerbField"]').should('have.length', 1)
    cy.get('[data-test="inputPrepositionField"]').should('have.length', 1)
    cy.get('[data-test="inputNounField"]').should('have.length', 1)
    
  })

  // check for reactivity for read only output field from adverb input field
  it('check for reactivity for read only output field from adverb input field', () => {
    cy.get('[data-test="inputAdverbField"]').type('banana')

    // press the button
    cy.get('[data-test="inputAdverbButton"]').click()

    // read value from output field
    cy.get('[data-test="outputField"]').should('have.value', 'banana')
    
    
    // cy.get('[data-test="outputField"]').clear()
    
    // not working and don't know where to call clear method
    // cy.get('[data-test="outputField"]').type('banana').clear()
  })

  // check for reactivity for read only output field from verb input field
  it('check for reactivity for read only output field from verb input field', () => {
    cy.get('[data-test="inputVerbField"]').type('apple')

    // press the button
    cy.get('[data-test="inputVerbButton"]').click()

    // read value from output field
    cy.get('[data-test="outputField"]').should('have.value', 'apple')

  })

  // check for reactivity for read only output field from preposition input field
  it('check for reactivity for read only output field from preposition input field', () => {

    cy.get('[data-test="inputPrepositionField"]').type('watermelon')

    // press the button
    cy.get('[data-test="inputPrepositionButton"]').click()

    // read value from output field
    
    cy.get('[data-test="outputField"]').should('have.value', 'watermelon')

  })

  // check for reactivity for read only output field from noun input field
  it('check for reactivity for read only output field from noun input field', () => {

    cy.get('[data-test="inputNounField"]').type('strawberry')

    // press the button
    cy.get('[data-test="inputNounButton"]').click()

    // read value from output field
    cy.get('[data-test="outputField"]').should('have.value', 'strawberry')

  })

  // check to see if the submit button exists
  it('check to see if the submit button exists', () => {

    cy.get('[data-test="submitButton"]').should('have.length', 2)

  })
})