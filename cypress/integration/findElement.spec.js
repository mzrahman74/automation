/// <reference types="cypress"/>

describe("Custom Locator", () => {
  it.only("Find locator", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="SignInButton"]');
    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });
});
