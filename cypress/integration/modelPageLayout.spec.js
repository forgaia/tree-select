describe('Model Page', function() {
  before(function() {
    // runs once before all tests in the block
    cy.login();
  });

  after(function() {
    // runs once after all tests in the block
  });

  beforeEach(function() {
    // runs before each test in the block
  });

  afterEach(function() {
    // runs after each test in the block
  });

  it('has 2 menu items', function() {
    cy.get('[data-cy=menuItem]')
      .its('length')
      .should('eq', 2);
  });

  it('Data Models is the default menu item', function() {
    cy.get('[data-cy=menuItem]')
      .first()
      .find('.ant-btn')
      .should('have.class', 'ant-btn-primary');
  });

  it('has 4 filters', function() {
    cy.get('[data-cy=filter]')
      .its('length')
      .should('eq', 4);
  });
});
