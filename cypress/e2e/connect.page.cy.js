it('Connect page should have accept new connection button', () => {

    cy.visit('http://localhost:8100/login')
    cy.get('[data-test="sign-in-btn"]').click()
    cy.get('[data-test="launchConnectPageButton"]').click()
    cy.get('[data-test="acceptNewConnectionBtn"]').click()
    cy.visit('http://localhost:8100/connect/accept-new-connection')
  })
