it('Connect page should have accept new connection button', () => {
    // Passed - Can navigate to the connect page successfully
    cy.visit('http://localhost:8100/connect')
    // Click the accept new connection button
    cy.get('[data-test="acceptNewConnectionBtn"]').click()
  })
