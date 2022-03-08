/// <reference types="cypress" />
describe('example to-do app', () => {
  it('loading all countries', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-cy=countriesList]').should('not.be.empty');
  });

  it('loading continents', () => {
    cy.visit('http://localhost:3000/');

    cy.get('.css-1s2u09g-control').click();

    //clicked and others
    cy.get('.css-yt9ioa-option').should('have.length', 7);
    cy.get('.css-1n7v3ny-option').should('have.length', 1);
  });

  it('loading countries after continent change', () => {
    cy.visit('http://localhost:3000/');

    //before change
    cy.get('[data-cy=countriesList]').should('not.be.empty');

    //changing
    cy.get('.css-1s2u09g-control').click();
    cy.get('#react-select-3-option-1').click();

    //after change
    cy.get('[data-cy=countriesList]').should('not.be.empty');
  });

  it('loading info about country', () => {
    //should load info about one country
    cy.visit('http://localhost:3000/AD');
    cy.get('[data-cy=code]').contains('AD');
    cy.get('[data-cy=name]').contains('Andorra');
    cy.get('[data-cy=emoji]').contains('🇦🇩');
    cy.get('[data-cy=lang]').contains('Catalan');

    //then another
    cy.visit('http://localhost:3000/US');
    cy.get('[data-cy=code]').contains('US');
    cy.get('[data-cy=name]').contains('United States');
    cy.get('[data-cy=emoji]').contains('🇺🇸');
    cy.get('[data-cy=lang]').contains('English');
  });

  it('filter should work', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#countrySearch').click().focused().type('Canada', { force: true });
    cy.get('[data-cy=country]').should('have.length', 1);
  });
});
