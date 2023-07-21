describe('check for inputs and buttons on review attributes page', () => {

    // get to review attributes page
    it('navigate to review attributes page', () => {
        cy.visit('http://localhost:8100/login')
        cy.get('[data-test="sign-in-btn"]').click()

        cy.get('[data-test="launchToBeReviewedPageButton"]').should('have.length', 1)
        cy.get('[data-test="launchToBeReviewedPageButton"]').click()
    })

    // display placeholder text in input field (expect: Click get next phrase to review)
    it('should display placeholder text in input field', () => {
        cy.get('input[placeholder*="Click get next phrase to review"]')
    })

    // display mock phrase in input field when get next phrase button clicked (expect: competitively writes nullvalue code)
    it('check to see if the get next review button displays mock data in input field', () => {
        cy.get('[data-test="launchGetNextPhraseBtn"]').should('have.length', 1)
        cy.get('[data-test="launchGetNextPhraseBtn"]').click()
        cy.get('[data-test="inputPhraseToBeReviewed"]').should('have.value', "competitively writes nullvalue code")

    })

    // display alert after approve button clicked
    it('should display an alert after approve button clicked', () => {
        
        // click approve button
        cy.get('[data-test="launchApproveBtn"]').should('have.length', 1)
        cy.get('[data-test="launchApproveBtn"]').click()

        // Assert that the alert is displayed
        cy.get('ion-alert').should('be.visible');

        // Interact with the elements inside the alert
        cy.get('ion-alert')
            .within(() => {
                cy.get('button').contains('OK').click(); // dismiss alert to continue any following tests
            });

        // Assert that the alert is no longer visible (it has been dismissed)
        cy.get('ion-alert').should('not.exist');

    })

    // display alert after reject button clicked (expect: mock data option "doesn't make sense")
    it('should display an alert after reject button clicked', () => {

        // click get next phrase button
        cy.get('[data-test="launchGetNextPhraseBtn"]').should('have.length', 1)
        cy.get('[data-test="launchGetNextPhraseBtn"]').click()
        
        // click reject button
        cy.get('[data-test="launchRejectBtn"]').should('have.length', 1)
        cy.get('[data-test="launchRejectBtn"]').click()

        // Assert that the alert is displayed
        cy.get('ion-alert').should('be.visible');

        // Interact with the elements inside the alert
        cy.get('ion-alert')
            .within(() => {
                cy.get('button').contains("doesn\'t make sense").click(); 
                cy.get('button').contains('OK').click(); // dismiss alert to continue any following tests
            });

        // Assert that the alert is no longer visible (it has been dismissed)
        cy.get('ion-alert').should('not.exist');

    })

})