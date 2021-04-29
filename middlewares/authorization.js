const jwt = require("jsonwebtoken");
const moment = require("moment");
const _ = require("lodash");
const models = require("../models");
const config = require("../configs");

const authorizeToken = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("TOKEN_NOT_FOUND");
    }
    [, token] = token.split("Bearer ");
    if (token) {
      const decoded = await jwt.verify(token, config.jwtSecret);
      if (!decoded) {
        throw new Error("SESSION_EXPIRED");
      }
      const user = await models.User.findOne({
        where: {
          id: _.get(decoded, "data.id"),
        },
        attributes: ["id", "firstName", "lastName", "email", "updatedAt"],
      });
      if (!user) {
        throw new Error("USER_NOT_FOUND");
      } else if (decoded.iat < moment(user.updatedAt).format("X")) {
        throw new Error("SESSION_EXPIRED");
      } else {
        req.user = user;
        next();
      }
    } else {
      throw new Error("TOKEN_NOT_FOUND");
    }
  } catch (err) {
    if (
      err instanceof jwt.JsonWebTokenError ||
      err instanceof jwt.TokenExpiredError
    ) {
      res.status(401).json({
        message: err.message,
      });
      return;
    }
    next(err);
  }
};

module.exports = exports = authorizeToken;
