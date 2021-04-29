const models = require("../../models");

const createOrUpdateEmployee = async (reqBody, transaction) => {
  const { id } = reqBody;
  let employee;

  if (id) {
    delete reqBody.id;
    employee = await models.Employee.update(reqBody, {
      where: {
        id,
      },
      transaction,
    });
    employee = await models.Employee.findOne({
      where: {
        id,
      },
      transaction,
    });
  } else {
    employee = await models.Employee.create(reqBody, {
      transaction,
    });
  }
  return employee;
};

module.exports = {
  createOrUpdateEmployee,
};
