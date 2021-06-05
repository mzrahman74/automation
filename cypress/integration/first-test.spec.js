/// <reference types="cypress"/>

describe("Selector tests", () => {
  it("Selector selection", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // Search by tag

    cy.get("input");

    // by id

    cy.get("#inputEmail1");

    // by class name

    cy.get(".input-full-width");

    // by Attribute name

    cy.get("[placeholder]");

    // by Attribute name and value

    cy.get('[placeholder="Email"]');

    // by class value

    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by tag name and Attribute with value

    cy.get('input[placeholder="Email"]');

    // by two different attribute

    cy.get('[placeholder="Email"]#inputEmail1.input-full-width');

    // by tag name, attribute with value id and class name

    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    // The most recommended way by cypress

    //cy.get('[data-cy="inputEmail"]')
  });

  it("second test", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //cy.get('[data-cy="signInButton"]')

    cy.contains('[status="warning"]', "Sign in");

    //Travel to the dom -- Parents and child

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");

    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    // find label
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputEmail1"]')
    //   .should("contain", "Email");
    // cy.contains("nb-card", "Using the Grid")
    //   .find('[for="inputPassword2"]')
    //   .should("contain", "Password");

    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputEmail1"]')
    //   .should("contain", "Email address");
    // cy.contains("nb-card", "Basic form")
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    // Selenium

    // const firstForm = cy.contains("nb-card", "Using the Grid");
    // const secondForm = cy.contains("nb-card", "Basic form");

    // firstForm.find('[for="inputEmail1"]').should("contain", "Email");
    // firstForm.find('[for="inputPassword2"]').should("contain", "Password");
    // secondForm
    //   .find('[for="exampleInputPassword1"]')
    //   .should("contain", "Password");

    // cypress style

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const emailLabelSecond = secondForm
          .find('[for="exampleInputEmail1"]')
          .text();
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();

        expect(passwordLabelFirst).to.equal(passwordLabelSecond);

        cy.wrap(secondForm)
          .find('[for="exampleInputEmail1"]')
          .should("contain", "Email address");
      });
    });
  });

  it("Invoke command", () => {
    cy.visit("/");
    cy.contains("Form").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get("[for=exampleInputEmail1")
      .should("contain", "Email address")
      .should("have.class", "label")
      .and("have.text", "Email address");

    // 2
    cy.get('[for="exampleInputEmail1"]').then((lable) => {
      expect(lable.text()).to.equal("Email address");
      expect(lable).to.have.class("label");
      expect(lable).to.have.text("Email address");

      // 3
      cy.get('[for="exampleInputEmail1"]')
        .invoke("text")
        .then((text) => {
          expect(text).to.equal("Email address");
        });

      cy.contains("nb-card", "Basic form")
        .find("nb-checkbox")
        .click()
        .find(".custom-checkbox")
        .invoke("attr", "class")
        //.should("contain", "checked");
        .then((classValue) => {
          expect(classValue).to.contain("checked");
        });
    });
  });
  it("assert property", () => {
    cy.visit("/");
    cy.contains("Form").click();
    cy.contains("Datepicker").click();

    let date = new Date();
    date.setDate(date.getDate() + 5);
    let futureDay = date.getDate();
    let futureMonth = date.toLocaleDateString("default", { month: "short" });

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        cy.get("nb-calendar-navigation")
          .invoke("attr", "ng-reflect-date")
          .then((dateAttribute) => {
            if (!dateAttribute.includes(futureMonth)) {
              cy.get('[data-name="chevron-righ"]').click();
              cy.get(
                'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
              )
                .contains(futureDay)
                .click();
            } else {
              cy.get(
                'nb-calendar-day-picker [class="day-cell ng-star-inserted"]'
              )
                .contains(futureDay)
                .click();
            }
          });

        // cy.get("nb-calendar-day-picker").contains("17").click();
        // cy.wrap(input)
        //   .invoke("prop", "value")
        //   .should("contain", "May 17, 2021");
      });
  });
  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layout").click();
    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first()
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    cy.get('[type="checkbox"]').check({ force: true });
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox').eq(1).check({ force: true });
  });
  it("list and dropdown", () => {
    cy.visit("/");

    //1
    // cy.get("nav nb-select").click();
    // cy.get(".options-list").contains("Dark").click();
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get("nb-layout-header nav").should(
    //   "have.css",
    //   "background-color",
    //   "rgb(34, 43, 69)"
    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();

        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        //cy.wrap(dropdown).click();
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
  it("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });

    // 2
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("Mohammad");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Rahman");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColums) => {
        cy.wrap(tableColums).eq(2).should("contain", "Mohammad");
        cy.wrap(tableColums).eq(3).should("contain", "Rahman");
      });
    // 3
    // cy.get('input[placeholder="Age"]').type("20");

    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });
});

it("tooltip", () => {
  cy.visit("/");
  cy.contains("Modal & Overlays").click();
  cy.contains("Tooltip").click();

  cy.contains("nb-card", "Colored Tooltips").contains("Default").click();

  cy.get("nb-tooltip").should("contain", "This is a tooltip");
});

it("Alert", () => {
  cy.visit("/");
  cy.contains("Tables & Data").click();
  cy.contains("Smart Table").click();

  // 3 - cancel
  cy.get("tbody tr").first().find(".nb-trash").click();
  cy.on("window:confirm", () => false);
  // //1- accept
  // cy.get("tbody tr").eq(1).find(".nb-trash").click();

  // cy.on("window:confirm", (confirm) => {
  //   expect(confirm).to.equal("Are you sure you want to delete?");
  // });
  // // 2 - accept
  // const stub = cy.stub();
  // cy.on("window:confirm", (confirm) => {
  //   cy.get("tbody tr")
  //     .first()
  //     .find(".nb-trash")
  //     .click()
  //     .then(() => {
  //       expect(stub.getCall(0)).to.be.calledWith(
  //         "Are you sure you want to delete?"

  //       );
  //     });
  // });
});
