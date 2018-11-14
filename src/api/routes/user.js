import express from "express";
import { UserController, AuthController } from "../controller";

const userRouter = express.Router({ mergeParams: true });
/*
route for listing all users
*/
userRouter.route("/").get(UserController.index);

userRouter.route("/:id").get(UserController.show);
/*
route for login in
*/
userRouter.route("/login").post(AuthController.signin);
/*
route for signing up
*/
userRouter.route("/signup").post(AuthController.signup);

export default userRouter;
