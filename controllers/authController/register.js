const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const moment = require("moment");

const configs = require("../../configs");
const models = require("../../models");

const registerUser = async (reqBody, transaction) => {
  const { email } = reqBody;
  let user = await models.User.findOne({
    where: {
      email,
    },
    transaction,
  });

  if (user) {
    throw new Error("USER_ALREADY_EXIST");
  }

  user = reqBody;
  user.password = bcrypt.hashSync(user.password);

  user = await models.User.create(user, {
    transaction,
  });
  let expiryTime = moment().add(1, "day").unix();
  const token = await jwt.sign(
    {
      data: {
        id: user.id,
      },
      exp: expiryTime,
    },
    configs.jwtSecret
  );
  return {
    success: true,
    message: "User Register Successfully",
    token,
  };
};

module.exports = {
  registerUser,
};
