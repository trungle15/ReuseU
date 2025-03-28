describe('Homepage Test', () => {
    it('Loads successfully', () => {
      cy.visit('/')
      cy.contains('Welcome').should('be.visible')
      cy.get('nav').should('exist')
    })
  })