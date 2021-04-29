const bcrypt = require("bcrypt-nodejs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const configs = require("../../configs");
const models = require("../../models");

const loginUser = async (reqBody, transaction) => {
  const { email, password } = reqBody;
  let user = await models.User.findOne({
    where: {
      email,
    },
    transaction,
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIAL");
  }

  const compare = await bcrypt.compareSync(password, user.password);
  if (!compare) {
    throw new Error("INVALID_CREDENTIAL");
  }

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
    message: "User logged-in Successfully",
    token,
  };
};

module.exports = {
  loginUser,
};

// $2a$10$u6Yv/xcu8SEHVDRiuJxVsORdYaFkfe3Tl2SkEkToCELTLu5Gbqus.
