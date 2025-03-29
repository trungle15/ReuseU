describe('Homepage Test', () => {
    it('Loads successfully', () => {
      cy.visit('/')
      cy.contains('ReuseU').should('be.visible')
      cy.get('div#__next').should('exist');
    })
  })