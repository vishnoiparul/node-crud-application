const Joi = require("joi");
const _ = require("lodash");

module.exports = {
  register: {
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(20).required(),
    }),
  },

  login: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },

  forgot: {
    body: Joi.object({
      email: Joi.string().required(),
    }),
  },

  reset: {
    body: Joi.object({
      password: Joi.string().required(),
    }),
  },
};
