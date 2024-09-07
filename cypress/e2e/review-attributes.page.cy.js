describe('Review Attributes page', () => {
    Cypress.Commands.add('goToReviewAttributesPage', () => {
        cy.appLogin();

        cy.intercept('GET', 'http://localhost:8080/api/review', (req) => {
            req.reply({
                statusCode: 200,
                body: [{"id":5,"hasBeenGroomed":true,"adverb":"1never","verb":"converts","preposition":"from","noun":"mac"}]
            });
        });

        cy.contains('ion-item', 'Review Attributes').click();

        cy.get('[data-test="launchGetNextPhraseBtn"]').should('have.length', 1)
    });

    Cypress.Commands.add('getNextPhrase', (obj) => {
        cy.goToReviewAttributesPage();

        cy.intercept('GET', 'http://localhost:8080/api/review', (req) => {
            req.reply({
                statusCode: 200,
                body: [{
                    "id":obj['id'] || 5,
                    "hasBeenGroomed":obj['hasBeenGroomed'] || true,
                    "adverb":obj['adverb'],"verb":obj['verb'],
                    "preposition":obj['preposition'],"noun":obj['noun']}]
            });
        }).as('getReview');
        cy.wait('@getReview')

        // click get next phrase button
        cy.get('[data-test="launchGetNextPhraseBtn"]').should('have.length', 1)
        cy.get('[data-test="launchGetNextPhraseBtn"]').click()
    });

    it('navigate to review attributes page', () => {
        cy.goToReviewAttributesPage();
    });

    // display placeholder text in input field (expect: Click get next phrase to review)
    it('should display placeholder text in input field', () => {
        cy.goToReviewAttributesPage();
        cy.get('input[placeholder*="Click get next phrase to review"]')
    })

    it('check to see if the get next review button displays mock data in input field', () => {
        cy.getNextPhrase({"id": 5, "hasBeenGroomed": true, "adverb": "never", "verb": "converts", "preposition": "from", "noun": "mac"});

        // cy.wait('@getReview').its('response.body').should('have.length', 1)

        cy.get('[data-test="launchApproveBtn"]').should('have.length', 1)
        cy.get('[data-test="inputPhraseToBeReviewed"]').should('have.value', "never converts from mac")
    })

    // display alert after approve button clicked
    it('should display an alert after approve button clicked', () => {
        cy.getNextPhrase({"id": 5, "hasBeenGroomed": true, "adverb": "never", "verb": "converts", "preposition": "from", "noun": "mac"});

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
        cy.getNextPhrase({"id": 5, "hasBeenGroomed": true, "adverb": "never", "verb": "converts", "preposition": "from", "noun": "mac"});

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
