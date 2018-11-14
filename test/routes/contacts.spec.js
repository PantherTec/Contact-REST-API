const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const should = chai.should();
const expect = chai.expect();
const request = require("supertest");

describe("contacts", done => {
  it("should return a 403 response, because there is no logged in user", done => {
    request(app)
      .get("/api/contacts")
      .expect(403, done);
  });
});

describe("login a contact with random credentials", done => {
  const contactCredentials = {
    name: "bobby",
    number: "08100742049"
  };
  it("should return a 403 response, because there is no logged in user", done => {
    request(app)
      .post("/api/contacts")
      .send(contactCredentials)
      .expect(403, done);
  });
});
