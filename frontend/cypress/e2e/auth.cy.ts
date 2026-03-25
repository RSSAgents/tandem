describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form', () => {
    cy.contains(/LOGIN|ВОЙТИ/).should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation errors for invalid email format', () => {
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('pass');
    cy.get('button[type="submit"]').click();

    cy.contains(/Invalid email|Неверный формат email/i).should('be.visible');
  });

  it('should show validation errors for short password', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();

    cy.contains(/Password is too short|Пароль слишком короткий/i).should('be.visible');
  });

  it('should show validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.contains(/Invalid email|Неверный формат email/i).should('be.visible');
    cy.contains(/Password is too short|Пароль слишком короткий/i).should('be.visible');
  });
});
