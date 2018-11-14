const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app");
const should = chai.should();
const expect = chai.expect();
const request = require("supertest");

chai.use(chaiHttp);

describe("users", done => {
  it("should return a 201 response", done => {
    request(app)
      .get("/api/users")
      .expect(201, done);
  });
});
describe("user signin", done => {
  const signupCredentials = {
    email: "sleepless@gmail.com",
    password: "thegreatking",
    username: "sleepless"
  };
  it("it should return a 201 status", done => {
    request(app)
      .post("/api/users/signup")
      .send(signupCredentials)
      .expect(201, done);
  });
});
describe("user signin", done => {
  const signupCredentials = {
    email: "sleepless@gmail.com",
    password: "thegreatking",
    username: "sleepless"
  };
  it("it should return a 401 status because the user with the set credentials alread exist", done => {
    request(app)
      .post("/api/users/signup")
      .send(signupCredentials)
      .expect(401, done);
  });
});
describe("login a user with random credentials", done => {
  const userCredentials = {
    email: "bobby@gmail.com",
    password: "caramel"
  };
  it("should return a 403 response, because there is no logged in user", done => {
    request(app)
      .post("/api/contacts")
      .send(userCredentials)
      .expect(403, done);
  });
});
