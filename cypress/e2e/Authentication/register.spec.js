let routes, auth;

before(() => {
  cy.fixture('auth').then((content) => (auth = content));
  cy.fixture('routes').then((content) => (routes = content));
});

beforeEach(() => {
  cy.visit(routes.registerPage);
});

describe('Login Page Tests', () => {
  it('checks if fields are visible', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.NameRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.EmailRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.PasswordRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.ConfirmPasswordRegisterInput)
      .should('be.visible')
      .and('have.value', '');

    cy.get(authSelectors.TermsRegisterCheckbox).should('be.visible');

    cy.get(authSelectors.RegisterPasswordSubmitButton).should('be.visible');
  });

  it('checks for errors', () => {
    const { authSelectors } = auth;

    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should('contain', 'Please enter your First Name');
    cy.get('.error-text').should('contain', 'Please enter your email address');
    cy.get('.error-text').should('contain', 'Please enter your password');
    cy.get('.error-text').should('contain', 'Please confirm your password');
    cy.get(authSelectors.NameRegisterInput).should('be.visible').type('l');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should(
      'contain',
      'Name is too short - should be 2 chars minimum'
    );
    cy.get(authSelectors.EmailRegisterInput).should('be.visible').type('loop');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should('contain', 'Invalid email address');
    cy.get(authSelectors.PasswordRegisterInput)
      .should('be.visible')
      .type('loop');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should('contain', 'Please use at least 8 characters');
    cy.get(authSelectors.ConfirmPasswordRegisterInput)
      .should('be.visible')
      .type('loop');
    cy.get(authSelectors.RegisterPasswordSubmitButton)
      .should('be.visible')
      .click();
    cy.get('.error-text').should('contain', 'Please use at least 8 characters');
  });
});
