describe('Attributes Page', () => {
  Cypress.Commands.add('goToAttributesPage', () => {
    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="sign-in-btn"]').click()

    cy.contains('ion-item', 'Attributes').click();
  });

  describe('Create Attributes Page', () => {
    Cypress.Commands.add('goToCreateAttributesPage', () => {
      cy.get('[data-test="launchHeaderPrimaryActionButton"]').click();
    });

    Cypress.Commands.add('fillAttributesForm', (adverb, verb, preposition, noun) => {
      cy.goToAttributesPage();
      cy.goToCreateAttributesPage();

      if (adverb) {
        cy.get('[data-test="inputAdverbField"]').type(adverb)
        cy.get('[data-test="inputAdverbField"]').should('have.value', adverb)
      }

      if (verb) {
        cy.get('[data-test="inputVerbField"]').type(verb)
        cy.get('[data-test="inputVerbField"]').should('have.value', verb)
      }

      if (preposition) {
        cy.get('[data-test="inputPrepositionField"]').type(preposition)
        cy.get('[data-test="inputPrepositionField"]').should('have.value', preposition)
      }

      if (noun) {
        cy.get('[data-test="inputNounField"]').type(noun)
        cy.get('[data-test="inputNounField"]').should('have.value', noun)
      }
    });

    Cypress.Commands.add('assertExpectedAlertDialogIsReturned', (alertMessage, mockBackendSettings) => {
      if (mockBackendSettings && mockBackendSettings.mockBackend) {
        cy.intercept('POST', '/api/attributes', (req) => {
          req.reply({
            statusCode: 200,
            body: {booleanMessage: mockBackendSettings.mockBackendResponse} // Mock response
          });
        }).as('submitAttributes');
      }

      // Check if submit button exists
      cy.get('[data-test="submitAttributesButton"]').should('have.length', 1);

      // Press submit button
      cy.get('[data-test="submitAttributesButton"]').click();

      cy.contains('ion-alert', alertMessage).should('exist');

      if (mockBackendSettings && mockBackendSettings.mockBackend) {
        cy.wait('@submitAttributes');
      }

      // Clear success button
      cy.wait(500);
      cy.get('button').click();
    });

    describe('the phrase already exists and is associated with the user', () => {
      it('fills the form with an existing attribute', () => {
        cy.fillAttributesForm('', 'sculpts', 'with', 'clay');
      });

      it('gets correct alert when entered attribute already exists', () => {
        cy.assertExpectedAlertDialogIsReturned('Attribute Exists');
      })
    })

    describe('the phrase is valid, but does not exist', () => {
      it('fills the form with an non-existing attribute', () => {
        cy.fillAttributesForm('', 'studies', 'with', 'partners');
      });

      it('gets correct alert when entered attribute does not exist', () => {
        cy.assertExpectedAlertDialogIsReturned('In Review', {mockBackend: true, mockBackendResponse: false});
      })
    })

    describe('the phrase is invalid', () => {
      it('fills the form with an invalid attribute', () => {
        cy.fillAttributesForm('', 'your', '', 'mom');
      });

      it('gets the correct alert for an invalid phrase entry', () => {
        cy.assertExpectedAlertDialogIsReturned('In Review', {mockBackend: true, mockBackendResponse: false});
      })
    })
  })
})
