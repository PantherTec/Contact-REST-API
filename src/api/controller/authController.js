/* eslint consistent-return: 0 */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { user: User } = require("../../db/models");
const { secretOrKey } = require("../../db/config/secret");

class AuthController {
  static errorResponse(err, res) {
    const error = err.mapped
      ? Object.values(err.mapped())
      : `an error occurred ${err}`;
    res.status(401).json(Object.assign({}, { success: false }, { error }));
  }
  /**
   * @swagger
   * /api/users/signup:
   *   post:
   *     description: signup
   *     tags:
   *       - authentication
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: Users email
   *         in: body
   *         required: true
   *       - name: password
   *         description: User's password
   *         in: body
   *         required: true
   *       - name: username
   *         description: User's username
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         type: object
   *         description: user signup succesful
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
   *       401:
   *         description: Signuo Failure
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static signup(req, res) {
    return User.findOne({ where: { username: req.body.username } }).then(
      exists => {
        if (exists) {
          res.status(401).json({ success: true, data: "user already exists" });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            User.create({
              username: req.body.username,
              email: req.body.email,
              password: hash
            })
              .then(data => {
                if (data) {
                  return res.status(201).json({ success: true, data });
                }
              })
              .catch(error => {
                AuthController.errorResponse(error, res);
              });
          });
        }
      }
    );
  }
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     description: Log user in
   *     tags:
   *       - authentication
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: User's email
   *         in: body
   *         required: true
   *       - name: password
   *         description: User's password
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         type: object
   *         description: user login was succesful
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
   *       401:
   *         description: Login Failure
   *         schema:
   *           $ref: '#/definitions/ErrorResponse'
   */
  static signin(req, res) {
    return User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user === null) {
          return res.status(401).json({
            error: "the user doesnt exist"
          });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Authentication failed"
            });
          }
          if (result) {
            const payload = {
              email: user.email,
              id: user.id
            };
            const token = jwt.sign(payload, secretOrKey, { expiresIn: "1h" });
            return res.status(200).json({
              success: true,
              data: token
            });
          }
          res.status(401).json({
            success: false,
            data: "Auth failed"
          });
        });
      })
      .catch(error => {
        AuthController.errorResponse(error, res);
      });
  }
}
export default AuthController;
