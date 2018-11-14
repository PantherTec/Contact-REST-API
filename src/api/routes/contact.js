import express from "express";
import { ContactController } from "../controller";
import verifyToken from "../../middleware/verifyToken";

const ContactRouter = express.Router({
  mergeParams: true
});
/*
route for creating and viewing contacts
*/
ContactRouter.route("/")
  .get(verifyToken, ContactController.index)
  .post(verifyToken, ContactController.create);
/*
routes for creating, viewing, and updating specific contacts
*/
ContactRouter.route("/:id")
  .get(verifyToken, ContactController.show)
  .put(verifyToken, ContactController.update)
  .delete(verifyToken, ContactController.delete);
/*
route for viewing all of the logged in users stared contacts
*/
ContactRouter.route("/stared").get(verifyToken, ContactController.stared);
/*
route for used to star a contact
*/
ContactRouter.route("/:id/star").put(verifyToken, ContactController.star);

export default ContactRouter;
