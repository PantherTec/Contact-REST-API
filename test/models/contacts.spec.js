import {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} from "sequelize-test-helpers";
import chai from "chai";
const expect = chai.expect;
const { contact: Contact } = require("../../src/db/models");

describe("user models", () => {
  const Model = new Contact(sequelize, dataTypes);
  const instance = Model;
  context("properties", () => {
    /*test to see if this properties exist in our models*/
    ["name", "number", "isStared"].forEach(checkPropertyExists(instance));
  });
});
