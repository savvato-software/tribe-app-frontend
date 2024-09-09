describe('empty spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/new-user')
    })

    Cypress.Commands.add('typeInTextField', (dataTest, text) => {
        cy.get(`[data-test=${dataTest}]`).click();
        cy.get(`[data-test=${dataTest}] input`).clear();
        cy.get(`[data-test=${dataTest}] input`).focus();
        cy.get(`[data-test=${dataTest}] input`).type(text)
    });
   
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
        cy.typeInTextField("name-input", "test");
        cy.typeInTextField("email-input", "test@gmail.com");
        cy.typeInTextField("password-input", "test1");
        cy.typeInTextField("phone-input", "303-555-5555");
        cy.get('[data-test="submit-button"]').should('not.have.attr', 'disabled');
    })

    it('allows user to click sign up button when phone number does not contain dashes', () => {
        cy.typeInTextField("name-input", "test");
        cy.typeInTextField("email-input", "test@gmail.com");
        cy.typeInTextField("password-input", "test1");
        cy.typeInTextField("phone-input", "3035555555");
        cy.get('[data-test="submit-button"]').should('not.have.attr', 'disabled');
    })

    it('does not allow user to sign up with missing inputs', () => {
        cy.typeInTextField("name-input", "test");
        cy.typeInTextField("email-input", "test@gmail.com");
        cy.typeInTextField("password-input", "test1");
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled');

        cy.typeInTextField("phone-input", "3035555555");
        cy.get('[data-test="name-input"]').clear();
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled');
    })
    
    it('does not allow user to sign up if inputs are not validated', () => {
        cy.typeInTextField("name-input", "test");
        cy.typeInTextField("email-input", "test@gmail.com");
        cy.typeInTextField("password-input", "test1");
        cy.typeInTextField("phone-input", "3035555555");
        cy.get('[data-test="submit-button"]').should('not.have.attr', 'disabled');

        cy.typeInTextField("email-input", "@gmail.com");
        cy.typeInTextField("phone-input", "303-5555555");
        cy.get('[data-test="submit-button"]').should('have.attr', 'disabled');
    })
})