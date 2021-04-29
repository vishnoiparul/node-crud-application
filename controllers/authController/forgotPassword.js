const moment = require("moment");
const jwt = require("jsonwebtoken");

const configs = require("../../configs");
const models = require("../../models");
const { sendMail } = require("../../services/mail");

const forgotPassword = async (reqBody, transaction) => {
  const { email } = reqBody;
  let user = await models.User.findOne({
    where: {
      email,
    },
    transaction,
  });
  if (user) {
    let expiryTime = moment().add(1, "hours").unix();
    const token = await jwt.sign(
      {
        data: {
          id: user.id,
        },
        exp: expiryTime,
      },
      configs.jwtSecret
    );
    await sendMail({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      link: `http://${configs.hostName}/verify?token=${token}`,
    });
  }
  return {
    success: true,
    message: "Link to reset password is sent to the mail successfully.",
  };
};

module.exports = {
  forgotPassword,
};
