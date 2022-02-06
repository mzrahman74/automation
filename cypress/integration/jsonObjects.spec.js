/// <reference types="cypress"/>

describe("JSON Objects", () => {
  it.only("JSON objects", () => {
    cy.openHomePage();

    const simpleObject = { key: "value", key2: "value2" };

    const simpleArrayValues = ["one", "two", "three"];

    const arrayOfObjects = [
      { key1: "value" },
      { key2: "value2" },
      { key3: "value3" },
    ];

    const typesOfData = { string: "this is a string ", number: 10 };

    const mix = {
      FirstName: "Mohammad",
      LastName: "Rahman",
      Age: 47,
      Students: [
        {
          firstName: "Nusrat",
          lastNaem: "Rahman",
        },
        {
          firstName: "Naushin",
          lastName: "Rahman",
        },
      ],
    };
    console.log(simpleObject.key2);
    console.log(simpleObject["key2"]);
    console.log(simpleArrayValues[1]);
    console.log(arrayOfObjects[2].key3);
    console.log(mix.Students[0].firstName);

    const lastNameOfSecondStudent = mix.Students[1].lastName

  });
});
