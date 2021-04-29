const Joi = require("joi");
const _ = require("lodash");

const validateDepartment = (value, helpers) => {
  const departmentList = require("../seeds/department.json");

  if (!departmentList.length) {
    return helpers.error("any.invalid");
  } else if (_.find(departmentList, { name: _.capitalize(value) })) {
    return value;
  } else {
    return helpers.error("any.invalid");
  }
};

const validateLocation = (value, helpers) => {
  const locationList = require("../seeds/location.json");

  if (!locationList.length) {
    return helpers.error("any.invalid");
  } else if (_.find(locationList, { name: _.capitalize(value) })) {
    return value;
  } else {
    return helpers.error("any.invalid");
  }
};

module.exports = {
  list: {
    query: Joi.object({
      department: Joi.string()
        .allow("")
        .allow(null)
        .valid("designer", "developer", "tester", "manager"),
      location: Joi.string(),
      age: Joi.number().integer().positive(),
      limit: Joi.number().integer().positive(),
      page: Joi.number().integer().positive(),
      searchString: Joi.string().allow("").allow(null),
    }),
  },

  create: {
    body: Joi.object({
      name: Joi.string().required(),
      jobTitle: Joi.string().required(),
      department: Joi.string().custom(validateDepartment, "custom validation"),
      location: Joi.string().custom(validateLocation, "custom validation"),
      age: Joi.number().integer().positive(),
      salary: Joi.number().integer().positive(),
    }),
  },

  update: {
    params: Joi.object({
      id: Joi.number()
        .required()
        .error(new Error("Employee id must be a valid number")),
    }),
    body: Joi.object({
      name: Joi.string().required(),
      jobTitle: Joi.string(),
      department: Joi.string().custom(validateDepartment, "custom validation"),
      location: Joi.string().custom(validateLocation, "custom validation"),
      age: Joi.number().integer().positive(),
      salary: Joi.number().integer().positive(),
    }),
  },

  deleteEmp: {
    params: Joi.object({
      id: Joi.number()
        .required()
        .error(new Error("Employee id must be a valid number")),
    }),
  },
};
