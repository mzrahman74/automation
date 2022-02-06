/// <reference types="cypress"/>

describe("Radio & Check box Tests", () => {
  it("Radio button tests", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 40);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleDateString("default", { month: "short" });

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        selectDayFromCurrent();

        function selectDayFromCurrent() {
          cy.get("nb-calendar-navigation")
            .invoke("attr", "ng-reflect-date")
            .then((dateAttribute) => {
              if (!dateAttribute.includes(futureMonth)) {
                cy.get('[data-name="chevron-right"]').click();
                selectDayFromCurrent();
              } else {
                cy.get(
                  'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
                )
                  .contains(futureDay)
                  .click();
              }
            });
        }

        // cy.get('nb-calendar-day-picker').contains('17').click()
        //cy.wrap(input).invoke('prop', 'value').should('contains', 'Oct 1, 2021')
      });
  });
});
