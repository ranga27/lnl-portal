let routes, auth;

before(() => {
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

describe('Forgot Password Page Tests', () => {
  it('checks if fields are visible', () => {
    const { authSelectors } = auth;
    cy.visit(routes.forgotPasswordPage);
    cy.get(authSelectors.forgotPasswordInputEmail)
      .should('be.visible')
      .and('have.value', '');
    cy.get(authSelectors.ForgotPasswordSubmitButton).should('be.visible');
  });

  it('checks for errors', () => {
    const { authSelectors } = auth;
    cy.visit(routes.forgotPasswordPage);
    cy.get(authSelectors.ForgotPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should('contain', 'Please enter your email address');
    cy.get(authSelectors.forgotPasswordInputEmail)
      .should('be.visible')
      .type('loop');
    cy.get(authSelectors.ForgotPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should('contain', 'Invalid email address');
  });
});
