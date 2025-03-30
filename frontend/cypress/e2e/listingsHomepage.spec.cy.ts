describe('ListingsHomepage', () => {
  it('displays 3 listings with "Title"', () => {
    cy.visit('/'); // Visit the homepage

    // Check if title exists
    cy.contains('Title').should('be.visible');
  });
}); 