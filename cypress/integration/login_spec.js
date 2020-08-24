describe("This will check if the user is logged in", () => {
  it("should load the user home page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("should go to register", () => {
    cy.get("[data-cy=register]").click();
  });
  //it("should make sure that the user data is loaded", () => {
  //// UI should reflect this user being logged in
  //cy.contains("test@test.com");
  //});

  //it("should contain an h1", () => {
  //cy.get("h1").should("contain", "פלטפורמה לקניות קמעוניות");
  //});

  //it("should contain main button", () => {
  //cy.get("a").contains("button", "צא לדרך");
  //});
  //it("should go to home page", () => {
  //cy.get("#home").click();
  //});

  //it("should make sure the url match", () => {
  //cy.url().should("eq", "http://localhost:3000/home");
  //});

  //it("should go back to home page", () => {
  //cy.get("[aria-label=עמוד ראשי]").click();
  //});
});
