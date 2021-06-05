import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigateTo } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe("Test with Page Object", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });

  it("verify navigation actoss the pages", () => {
    navigateTo.formLayoutPage();
    navigateTo.datepickerPage();
    navigateTo.toasterPage();
    navigateTo.tooltipPage();
    navigateTo.smartTablePage();
  });

  it.only("should submit Inline and Basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail(
      "Mohammad",
      "test@test.com"
    );
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      "test@test.com",
      "password"
    );
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastNane("Mohammad", "Rahman");
    onSmartTablePage.updateAgeByFirstNane("Mohammad", 47);
    onSmartTablePage.deleteRowbyIndex(1);
  });
});
