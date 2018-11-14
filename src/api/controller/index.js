import ContactController from "./contactController";
import AuthController from "./authController";
import UserController from "./userController";

/*
the next block of comments contain the error response used
across all endpoints for swagger documentation
*/
/**
 * @swagger
 * definitions:
 *   ErrorResponse:
 *     type: object
 *     properties:
 *       success:
 *         type: boolean
 *         default: false
 *       message:
 *         type: string
 */

export { ContactController, AuthController, UserController };
