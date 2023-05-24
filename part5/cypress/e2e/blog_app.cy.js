describe("blog app", () => {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");
    const user = {
      name: "Joe Star",
      username: "Joe",
      password: "jstar",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);

    const user2 = {
      name: "Alex Lion",
      username: "Alex",
      password: "lion",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user2);

    cy.visit("http://localhost:3000");
  });

  it("front page can open nice", () => {
    cy.contains("Log into application");
  });

  describe("Login", () => {
    it("it succeeds with correct credentials", function () {
      cy.get("#username").type("Joe");
      cy.get("#password").type("jstar");
      cy.get("#login-button").click();
      cy.contains("Joe Star is logged in");
    });

    it("it fails with incorrect credentials", function () {
      cy.contains("Login").click();
      cy.get("#username").type("Joe");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error").contains("The credentials are incorrect");
    });
  });

  describe("when logged in", () => {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "Joe",
        password: "jstar",
      }).then((response) => {
        localStorage.setItem("loggedInUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });

      cy.createBlog({ title: "First Blog", author: "JJ", url: "www.com" });
    });

    it("new note can be created", function () {
      cy.contains("New Blog").click();
      cy.get("input:first").type("Cool Blog");
      cy.get("#author").type("J James");
      cy.get("#url").type("www.jj.com");
      cy.get("#create").click();
      cy.contains("Cool Blog");
    });

    it("can like blog", function () {
      cy.contains("First Blog").contains("Show").click();
      cy.contains("First Blog").contains("like").click();
      cy.contains("First Blog").contains("likes: 1");
    });

    it("can delete blog", function () {
      cy.contains("First Blog").contains("Show").click();
      cy.contains("First Blog").contains("remove").click();
      cy.get(".blog").should("not.exist");
    });

    it.only("only creator can delete blog", function () {
      cy.contains("logout").click();
      cy.get("#username").type("Alex");
      cy.get("#password").type("lion");
      cy.get("#login-button").click();
      cy.contains("Alex Lion is logged in");
    });
  });
});
