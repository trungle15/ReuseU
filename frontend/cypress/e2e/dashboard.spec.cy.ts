import cypress from "cypress";

describe('Dashboard', () => {
    it('shows the ReuseU logo and search bar', () => {
      cy.visit('/'); //  page with the Dashboard
  
      // Check if the ReuseU text exists
      cy.contains('ReuseU').should('be.visible');
  
      // Check if the search bar exists
      cy.get('input[placeholder="Search for a Listing"]').should('exist');
    });
  });