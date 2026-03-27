describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should load dashboard after login', () => {
    cy.url().should('include', '/dashboard');
  });

  it('should be welcome message', () => {
    cy.contains(/Hello|Привет/).should('be.visible');
  });

  it('should be description', () => {
    cy.contains(
      /Your journey starts here. Choose your first module!|Твой путь начинается здесь. Выбери первый модуль!/,
    ).should('be.visible');
  });

  it('should navigate to widget-console', () => {
    cy.contains('Drag & Drop JS Execution').click();
    cy.url().should('include', '/widget-console');
  });

  it('should navigate to stack', () => {
    cy.contains('Stack').click();
    cy.url().should('include', '/stack');
  });

  it('should navigate to fill in the blanks', () => {
    cy.contains('Fill in the Blanks').click();
    cy.url().should('include', '/fill-blanks');
  });
});
