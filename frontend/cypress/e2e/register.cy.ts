describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should display register form', () => {
    cy.contains(/Sign Up|Регистрация/).should('be.visible');
    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="confirmPassword"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation error for empty name', () => {
    cy.get('button[type="submit"]').click();
    cy.contains(/Name is too short|Имя слишком короткое/i).should('be.visible');
  });

  it('should show validation error for too short name', () => {
    cy.get('input[name="name"]').type('a');
    cy.get('button[type="submit"]').click();
    cy.contains(/Name is too short|Имя слишком короткое/i).should('be.visible');
  });

  it('should show validation errors for invalid email format', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('invalid-email');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.contains(/Invalid email|Неверный формат email/i).should('be.visible');
  });

  it('should show validation error for too short password', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('12345');
    cy.get('input[name="confirmPassword"]').type('12345');
    cy.get('button[type="submit"]').click();

    cy.contains(/Password is too short|Пароль слишком короткий/i).should('be.visible');
  });

  it('should show error when passwords do not match', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password456');
    cy.get('button[type="submit"]').click();

    cy.contains(/Passwords do not match|Пароли не совпадают/i).should('be.visible');
  });

  it('should show all validation errors when fields are empty', () => {
    cy.get('button[type="submit"]').click();

    cy.contains(/Name is too short|Имя слишком короткое/i).should('be.visible');
    cy.contains(/Invalid email|Неверный формат email/i).should('be.visible');
    cy.contains(/Password is too short|Пароль слишком короткий/i).should('be.visible');
  });
});
