import express from "express";
import { swaggerSpec, swaggerUI } from "../../db/config/swagger";
/* create our router*/
const docsRouter = express.Router();

export const getJson = (req, res) => {
  /*specify the header type*/
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};
/*
route for swagger documentation
*/
docsRouter.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default docsRouter;
