describe('Listing', () => {
    it('displays a title, price, and favorite button', () => {
      cy.visit('/'); //  page with Listing component
  
      // Check if title exists
      cy.contains('Deadbeat Father').should('be.visible');
  
      // Check if price exists
      cy.contains('$399').should('be.visible');
  
      // Check if favorite button exists (heart icon)
      cy.get('svg').should('exist'); // Checks for any icon (simplest way)
    });
  });