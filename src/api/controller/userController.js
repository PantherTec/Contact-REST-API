const { user: User } = require("../../db/models");

class UserController {
  static errorResponse(err, res) {
    const error = err.mapped
      ? Object.values(err.mapped())
      : `an error occurred ${err}`;
    res.status(401).json(Object.assign({}, { success: false }, { error }));
  }
  /**
   * @swagger
   * /api/contacts:
   *   get:
   *     description: Retrieve the list of users
   *     tags:
   *       - contacts
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         type: object
   *         description: list users success
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   *       50x:
   *         description: listing users failed
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       401:
   *         description: Listing contacts failed
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async index(req, res) {
    const fetchUsers = () => User.findAll();
    try {
      const userList = await fetchUsers(req.query);
      if (userList) {
        res.status(201).json({
          success: true,
          data: userList
        });
      } else {
        res.status(401).json({ success: false, data: "there are no Users" });
      }
    } catch (error) {
      UserController.errorResponse(error, res);
    }
  }
  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     description: show user details
   *     tags:
   *       - users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         type: object
   *         description: user was succesfully fetched
   *         required:
   *          - success
   *          - data
   *         properties:
   *          success:
   *            type: boolean
   *          data:
   *            type: array
   *            items:
   *              $ref: '#/definitions/User'
   *       50x:
   *         description: error while fetching contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   *       401:
   *         description: error while fetching contact
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static async show(req, res) {
    const fetchUser = userId => User.fetchDetails(userId);
    try {
      const user = await fetchUser(req.params.id);
      if (user) {
        return res.status(200).json({ success: true, data: user });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "could not return any user data" });
      }
    } catch (error) {
      UserController.errorResponse(error, res);
    }
  }
}
export default UserController;
