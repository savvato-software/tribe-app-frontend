describe('Connections Page', () => {
    Cypress.Commands.add('goToConnectionsPage', () => {
        cy.appLogin();
        cy.get('[data-test="connect-menu-item"]').click();
        cy.contains('ion-item', 'Connect').click();
    });

    it('navigate to connections page', () => {
        cy.goToConnectionsPage();
    });

    it('should display connections page', () => {
        cy.goToConnectionsPage();
        cy.get('.listbtn').should('have.length', 1);
        cy.get('.openbtn').should('have.length', 1);
        cy.get('.acceptbtn').should('have.length', 1);
    });

    describe('List Connections Page', () => {
        const connectionListItemDataTest = '[data-test="connectionListItem"]';

        let connections;
        // I set up the connections this way for easy resetting after a test.
        // See 'should correctly delete a connection that is not requesting' for details.
        function initializeConnections() {
            connections = [
                {
                    "connectionError": null,
                    "connectionSuccess": true,
                    "message": "",
                    "to": {
                        "userId": 11,
                        "username": "testuser10",
                        "userConnectionStatus": "requesting"
                    }
                },
                {
                    "connectionError": null,
                    "connectionSuccess": true,
                    "message": "",
                    "to": {
                        "userId": 4,
                        "username": "testuser3",
                        "userConnectionStatus": "to be connected with"
                    }
                },
            ];
        }
        initializeConnections();

        Cypress.Commands.add('goToListConnectionsPage', () => {
            cy.goToConnectionsPage();
            Cypress.log({ displayName: 'Request body', message: "test" });
            const userId = '12345';
            cy.intercept('GET', 'api/connect/' + userId + '/all', (req) => {
                const requestingUserId = req.body.requestingUserId;
                Cypress.log({ displayName: 'Request body', message: req.body });
                req.reply({
                    statusCode: 200,
                    body: connections
                })
            }).as('getAllConnections');

            cy.get('.listbtn').click();
        });

        it('should display list connections page', () => {
            cy.goToListConnectionsPage();
            cy.get(connectionListItemDataTest).should('have.length', 2);
        });

        describe('Connection Details Page', () => {
            const connectionDetailsDataTest = '[data-test="connectionDetails"]';
            const removeConnectionButtonDataTest = '[data-test="removeConnectionButton"]';
            const viewProfileButtonDataTest = '[data-test="viewProfileButton"]';
            const cancelButtonDataTest = '[data-test="cancelButton"]';

            Cypress.Commands.add('goToConnectionDetailsPage', (index) => {
                cy.goToListConnectionsPage();
                cy.get(connectionListItemDataTest).eq(index).click();
            });

            it('should display correct items', () => {
                // I chose connections[1] because its userConnectionStatus is "to be connected with".
                // This allows it to display all buttons, including the delete button, which is ideal for this test.
                cy.goToConnectionDetailsPage(1);
                cy.get(connectionDetailsDataTest).should('exist');
                cy.get(removeConnectionButtonDataTest).should('exist');
                cy.get(viewProfileButtonDataTest).should('exist');
                cy.get(cancelButtonDataTest).should('exist');
            });

            it('should cancel and return to list connections page without altering the connections list', () => {
                cy.goToConnectionDetailsPage(0);
                cy.get(cancelButtonDataTest).click();
                cy.get(connectionListItemDataTest).should('have.length', 2);
            });

            it('should have no delete button for a connection that is requesting', () => {
                cy.goToConnectionDetailsPage(0);
                cy.get(removeConnectionButtonDataTest).should('not.exist');
            });

            it('should correctly delete a connection that is not requesting', () => {
                cy.intercept('DELETE', `/api/connect`, (req) => {
                    connections = connections.filter((connection) => connection.to.userId !== req.body.connectedWithUserId);
                    req.reply({ statusCode: 200 });
                }).as('deleteConnection');

                cy.goToConnectionDetailsPage(1);
                cy.get(removeConnectionButtonDataTest).click();
                cy.get('.alert-button-role-confirm').click();
                cy.get(connectionListItemDataTest).should('have.length', 1).then(() => initializeConnections());
            })
        })
    });

    describe('Accept New Connection Page', () => {

    });

    describe('Open Connection Page', () => {

    });
  })
