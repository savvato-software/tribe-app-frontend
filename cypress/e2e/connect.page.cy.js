describe('Connections Page', () => {
    Cypress.Commands.add('goToConnectionsPage', () => {
        cy.appLogin();
        cy.get('[data-test="connect-menu-item"]').click();
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
        Cypress.Commands.add('goTolistConnectionPage', () => {
            cy.goToConnectionsPage();

            // get a component with the class "listbtn" and click it
            cy.get('.listbtn').click();
        });

        const userId = '12345';

        it('should display list connections page', () => {
            cy.intercept('GET', 'http://localhost:8080/api/connect/' + userId + '/all', (req) => {
                req.reply({
                    statusCode: 200,
                    body: [{
                            to: {
                                userId: '344',
                                username: 'testuser1'
                            }
                        },
                        {
                            to: {
                                userId: '345',
                                username: 'testuser2',
                            }
                        }, {
                            to: {
                                userId: '346',
                                username: 'testuser3',
                            }
                        }]
                });
            }).as('getAllConnections');

            cy.goTolistConnectionPage();
            cy.get('[data-test="connectionListItem"]').should('have.length', 3);
        });
    });

    describe('Accept New Connection Page', () => {

    });

    describe('Open Connection Page', () => {

    });
  })
