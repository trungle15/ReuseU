describe('ListingsHomepage', () => {
    it('shows multiple listings', () => {
      cy.visit('/'); // homepage
  
      // check if at least 3 listings are visible
      cy.contains('Deadbeat Father').should('have.length.at.least', 3);
    });
  });