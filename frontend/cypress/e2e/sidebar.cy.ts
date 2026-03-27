describe('Sidebar Navigation', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@test.com');
    cy.get('input[name="password"]').type('test1234');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  const links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Library', path: '/library' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'About', path: '/about' },
  ];

  links.forEach((link) => {
    it(`should navigate to ${link.path} via sidebar`, () => {
      cy.contains(link.name).click();
      cy.url().should('include', link.path);
    });
  });
});
