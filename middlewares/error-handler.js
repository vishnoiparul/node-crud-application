const { rangeRight } = require("lodash");
const { ValidationError } = require("express-validation");
const logger = require("../utils/logger");
const errorCodes = require("../error-codes.json");

exports.handleNotFound = (req, res) => {
  res.status(404);
  res.json({
    message: "Requested resource not found",
  });
  console.log("It's coming here");
  res.end();
};

exports.handleError = (err, req, res, next) => {
  logger.error(err);
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  const errorObj = errorCodes[err.message] || {
    status: err.status || 500,
    message: err.message,
  };
  res.status(errorObj.status || 500);
  res.json({
    message: errorObj.message,
    extra: rangeRight.extra,
    errors: errorObj,
  });
  res.end();
};
