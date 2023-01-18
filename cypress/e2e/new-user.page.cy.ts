describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/new-user')
    })
   
    it('takes user to new user page', () => {
      cy.contains('Create new user')
      cy.get("ion-input").should('have.length', 4)
      cy.get('[data-test="submit-button"]').should('have.attr', 'disabled')
      
      })
      
    it('takes us back to login page on clicking cancel', () =>{
        cy.get('[data-test="cancel-button"]').click()
        cy.get(".submit-btn").should('have.length', 3)
        cy.get(".submit-btn").should('have.text', 'Sign InCreate New UserForgot Password?')
    }) 
    
    it('allows user to click sign up button when phone number contains dashes', () => {
        cy.get('[data-test="name-input"]').type("test")
        cy.get('[data-test="email-input"]').type("test@gmail.com")
        cy.get('[data-test="password-input"]').type("test1")
        cy.get('[data-test="phone-input"]').type("303-555-5555")
        cy.get('[data-test="submit-button"]').should('not.have.attr', 'disabled')
    })

    it('allows user to click sign up button when phone number does not contain dashes', () => {
        cy.get('[data-test="name-input"]').type("test")
        cy.get('[data-test="email-input"]').type("test@gmail.com")
        cy.get('[data-test="password-input"]').type("test1")
        cy.get('[data-test="phone-input"]').type("3035555555")
        cy.get('[data-test="submit-button"]').should('not.have.attr', 'disabled')
    })
    
    it('does not allow user to sign up with missing inputs', () => {
        cy.get('[data-test="name-input"]').type("test")
        cy.get('[data-test="email-input"]').type("test@gmail.com")
        cy.get('[data-test="password-input"]').type("test1")
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled')

        cy.get('[data-test="phone-input"]').click({force: true}).type("3035555555")
        cy.get('[data-test="email-input"]').clear()
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled')
    })
    
    it('does not allow user to sign up if inputs are not validated', () => {
        cy.get('[data-test="name-input"]').type("test")
        cy.get('[data-test="email-input"]').type("test")
        cy.get('[data-test="password-input"]').type("test1")
        cy.get('[data-test="phone-input"]').type("3035555555")
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled')
        
        cy.get('[data-test="email-input"]').type("@gmail.com")
        cy.get('[data-test="phone-input"]').clear().click({force: true}).type("303-5555555")
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled')
    })
})