const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

const models = require("../../models");
const auth = require("../../middlewares/authorization");
const { registerUser } = require("../../controllers/authController/register");
const { loginUser } = require("../../controllers/authController/login");
const {
  forgotPassword,
} = require("../../controllers/authController/forgotPassword");
const {
  resetPassword,
} = require("../../controllers/authController/resetPassword");

const {
  register,
  login,
  forgot,
  reset,
} = require("../../validations/auth.validation");

router.post("/register", validate(register, {}, {}), async (req, res, next) => {
  let transaction = await models.sequelize.transaction();
  try {
    let response = await registerUser(req.body, transaction);
    transaction.commit();
    if (response.token) {
      res.set("AuthToken", response.token);
      delete response.token;
    }
    res.status(201).send(response);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
});

router.post("/login", validate(login, {}, {}), async (req, res, next) => {
  let transaction = await models.sequelize.transaction();
  try {
    const response = await loginUser(req.body, transaction);
    transaction.commit();
    if (response.token) {
      res.set("AuthToken", response.token);
      delete response.token;
    }
    res.status(200).send(response);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
});

router.post(
  "/forgot-password",
  validate(forgot, {}, {}),
  async (req, res, next) => {
    let transaction = await models.sequelize.transaction();
    try {
      const response = await forgotPassword(req.body, transaction);
      transaction.commit();
      res.status(200).send(response);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
);

router.use(auth);

router.post(
  "/reset-password",
  validate(reset, {}, {}),
  async (req, res, next) => {
    let transaction = await models.sequelize.transaction();
    try {
      const response = await resetPassword(req.body, req.user.id, transaction);
      transaction.commit();
      res.status(200).send(response);
    } catch (err) {
      transaction.rollback();
      next(err);
    }
  }
);

router.get("/verify-link", async (req, res, next) => {
  try {
    if (req.user) {
      res.status(200).send({
        message: "Reset password request verified successfully.",
      });
    } else {
      throw new Error("INVALID_REQUEST");
    }
  } catch (err) {
    transaction.rollback();
    next(err);
  }
});

module.exports = router;
