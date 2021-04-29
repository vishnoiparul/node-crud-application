const _ = require("lodash");
const Sequelize = require("sequelize");
const models = require("../../models");
const Op = Sequelize.Op;

const getEmployee = async (filters) => {
  let {
    page = 1,
    limit = 10,
    location = null,
    department = null,
    age = null,
    searchString = "",
  } = filters;
  let where = {};
  if (searchString) {
    where = {
      ...where,
      [Op.or]: [
        {
          name: { [Op.iLike]: "%" + searchString + "%" },
        },
        {
          jobTitle: { [Op.iLike]: "%" + searchString + "%" },
        },
      ],
    };
  }
  if (location) {
    where = {
      ...where,
      location: _.capitalize(location),
    };
  }
  if (department) {
    where = {
      ...where,
      department: _.capitalize(department),
    };
  }
  if (age) {
    where = {
      ...where,
      age,
    };
  }
  let totalEmployee = await models.Employee.count({
    where,
  });

  let employees = await models.Employee.findAll({
    attributes: [
      "id",
      "name",
      "jobTitle",
      "department",
      "location",
      "age",
      "salary",
    ],
    where,
    limit: limit,
    offset: (page - 1) * limit,
  });
  return {
    success: true,
    employees,
    totalResult: totalEmployee,
  };
};

module.exports = {
  getEmployee,
};
