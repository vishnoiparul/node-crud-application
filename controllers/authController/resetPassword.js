const bcrypt = require("bcrypt-nodejs");
const models = require("../../models");

const resetPassword = async (reqBody, userId, transaction) => {
  let { password } = reqBody;
  password = bcrypt.hashSync(password);
  await models.User.update(
    {
      password,
    },
    {
      where: {
        id: userId,
      },
      transaction,
    }
  );
  return {
    success: true,
    message: "Successfully updated password",
  };
};

module.exports = {
  resetPassword,
};
