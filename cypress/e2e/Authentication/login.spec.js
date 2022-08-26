let routes, auth;

before(() => {
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.loginPage);
});

describe('Login Page Tests', () => {
  it('checks if fields are visible', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.EmailLoginInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.PasswordLoginInput)
      .should('be.visible')
      .and('have.value', '');
  });

  it('checks for invalid email format errors', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.LoginPasswordSubmitButton).should('be.visible').click();

    cy.get('.error-text').should('contain', 'Please enter your email address');

    cy.get(authSelectors.EmailLoginInput)
      .should('be.visible')

      .type('loop');
    cy.get(authSelectors.LoginPasswordSubmitButton).should('be.visible').click();

    cy.get('.error-text').should('contain', 'Invalid email address');
  });

  it('checks for wrong email and password', () => {
    const { authSelectors } = auth;
    cy.get(authSelectors.EmailLoginInput)
      .should('be.visible')

      .type('test@loopnotluck.com');

    cy.get(authSelectors.PasswordLoginInput)
      .should('be.visible')

      .type('00000000');

    cy.get(authSelectors.LoginPasswordSubmitButton).should('be.visible').click();

    cy.get('.swal2-popup')
      .should('be.visible')
      .contains(
        'Please try again or create an account if you have not done that'
      );
  });

  it('checks for successful login', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.EmailLoginInput)
      .should('be.visible')

      .type(Cypress.env('USER_EMAIL'));

    cy.get(authSelectors.PasswordLoginInput)
      .should('be.visible')

      .type(Cypress.env('USER_PASSWORD'));

    cy.get(authSelectors.LoginPasswordSubmitButton).should('be.visible').click();

    cy.url().should('eq', routes.landingPage);
  });
});
