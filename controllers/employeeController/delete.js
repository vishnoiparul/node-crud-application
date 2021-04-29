const models = require("../../models");

const deleteEmployee = async (reqBody, transaction) => {
  const { id } = reqBody;

  return models.Employee.destroy({
    where: {
      id,
    },
    transaction,
  });
};

module.exports = {
  deleteEmployee,
};
