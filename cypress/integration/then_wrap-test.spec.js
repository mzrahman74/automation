/// <reference types="cypress"/>

describe("Then & Wrap", () => {
  it.only("Then & Wrap", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      // expect(passwordLabelFirst).to.equal("Password");

      cy.wrap(firstForm)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");

      /*
      then use for create object as jquery & wrap use switch back to cypress

      */
    });
  });
});
