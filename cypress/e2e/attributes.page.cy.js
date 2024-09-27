describe('Attributes Page', () => {
  Cypress.Commands.add('goToAttributesPage', () => {
    cy.appLogin();

    const userId = '12345';

    cy.intercept('GET', 'api/attributes/' + userId, (req) => {
        req.reply({
            statusCode: 200,
            body: [{"phrase":{"id":3,"adverb":"","verb":"sculpts","preposition":"with","noun":"clay"},"sequence":1,"userCount":1},
                    {"phrase":{"id":2,"adverb":"","verb":"plays","preposition":"","noun":"chess"},"sequence":2,"userCount":2}]
        });
    });

    cy.contains('ion-item', 'Attributes').click();
  });

  it('navigate to attributes page', () => {
    cy.goToAttributesPage();
  });

  it('should display a list of attributes', () => {
    cy.goToAttributesPage();
    cy.get('.attributeItem').should('have.length', 2);
  });

  describe('Create Attributes Page', () => {
    Cypress.Commands.add('goToCreateAttributesPage', () => {
      cy.goToAttributesPage();
      cy.get('[data-test="launchHeaderPrimaryActionButton"]').click();
    });

    Cypress.Commands.add('fillAttributesForm', (adverb, verb, preposition, noun) => {
      cy.goToCreateAttributesPage();

      cy.contains('..loading..').should('not.exist');
      cy.wait(200)

      if (adverb) {
        cy.get('[data-test="inputAdverbField"]').should('not.be.disabled');
        cy.get('[data-test="inputAdverbField"]').type(adverb)
        cy.get('[data-test="inputAdverbField"]').should('have.value', adverb)
      }

      if (verb) {
        cy.get('[data-test="inputVerbField"]').should('not.be.disabled');
        cy.get('[data-test="inputVerbField"]').type(verb)
        cy.get('[data-test="inputVerbField"]').should('have.value', verb)
      }

      if (preposition) {
        cy.get('[data-test="inputPrepositionField"]').should('not.be.disabled');
        cy.get('[data-test="inputPrepositionField"]').type(preposition)
        cy.get('[data-test="inputPrepositionField"]').should('have.value', preposition)
      }

      if (noun) {
        cy.get('[data-test="inputNounField"]').should('not.be.disabled');
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
  describe('Reorder Attributes', () => {

    it('should move an attribute up the list', () => {
      cy.goToAttributesPage();
      cy.get('[data-test="attributeItem"]').eq(1).click();
      cy.get('[data-test="upButton"]').click();
      cy.get('[data-test="attributeItem"]').eq(0).contains(' plays chess (2 users)x');
      cy.get('[data-test="attributeItem"]').eq(1).contains( ' sculpts with clay (1 users)x');
    });
  
    it('should move an attribute down the list', () => {
      cy.goToAttributesPage();
      cy.get('[data-test="attributeItem"]').eq(0).click();
      cy.get('[data-test="downButton"]').click();
      cy.get('[data-test="attributeItem"]').eq(0).contains(' plays chess');
      cy.get('[data-test="attributeItem"]').eq(1).contains( ' sculpts with clay (1 users)x');
    });
  
    it('should disable the "Up" button for the first item', () => {
      cy.goToAttributesPage();
      cy.get('[data-test="attributeItem"]').eq(0).click();
      cy.get('[data-test="upButton"]').should('have.attr','disabled');
    });
  
    it('should disable the "Down" button for the last item', () => {
      cy.goToAttributesPage();
      cy.get('[data-test="attributeItem"]').eq(1).click();
      cy.get('[data-test="downButton"]').should('have.attr','disabled');
    });

    it('should enable and save changes after reordering', () => {
      cy.goToAttributesPage();
      cy.get('[data-test="attributeItem"]').eq(1).click();
      cy.get('[data-test="upButton"]').click();
      cy.get('[data-test="saveButton"]').should('not.be.disabled');
      cy.intercept('POST', '/api/attributes/update', {
        statusCode: 200,
        body: { success: true }
      }).as('saveAttributesOrder');
      cy.get('[data-test="saveButton"]').click();
      cy.wait('@saveAttributesOrder');
    });
  });

  
})
