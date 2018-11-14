/* eslint consistent-return: 0 */
import jwt from "jsonwebtoken";
import { secretOrKey } from "../db/config/secret";

const verifyToken = (req, res, next) => {
  /*assign our token header to a constant called token*/
  const token = req.headers["x-access-token"];
  /*if there is no token*/
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });
  /*when there is a token, verify with with jwt.verify*/
  jwt.verify(token, secretOrKey, (err, decoded) => {
    /*if there is an error*/
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    // save to request for use in other routes
    req.userId = decoded.id;
    next();
  });
};
export default verifyToken;
