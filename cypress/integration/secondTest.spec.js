/// <reference types="cypress"/>

describe("Test log out", () => {
  beforeEach("Login to the app", () => {
    cy.lgoinToApplication();
  });

  it("verify user can logout successfully", () => {
    cy.contains("Settings").click();
    cy.contains("gr click here to logout").click();
    cy.get(".navbar-nav").should("contain", "Sign up");
  });
});
