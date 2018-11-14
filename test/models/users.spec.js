import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
  checkUniqueIndex
} from "sequelize-test-helpers";
import chai from "chai";
const expect = chai.expect;
const { user: User } = require("../../src/db/models");

describe("user models", () => {
  const Model = new User(sequelize, dataTypes);
  const instance = Model;

  context("properties", () => {
    ["username", "email", "password"].forEach(checkPropertyExists(instance));
  });
});
