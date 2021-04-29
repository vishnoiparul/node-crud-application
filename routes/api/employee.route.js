const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

const models = require("../../models");
const auth = require("../../middlewares/authorization");
const { getEmployee } = require("../../controllers/employeeController/list");
const {
  createOrUpdateEmployee,
} = require("../../controllers/employeeController/createOrUpdate");
const {
  deleteEmployee,
} = require("../../controllers/employeeController/delete");
const {
  list,
  create,
  update,
  deleteEmp,
} = require("../../validations/employee.validation");

router.use(auth);

router.get("/", validate(list, {}, {}), async (req, res, next) => {
  try {
    const employees = await getEmployee(req.query);
    res.status(200).send(employees);
  } catch (err) {
    next(err);
  }
});

router.post("/", validate(create, {}, {}), async (req, res, next) => {
  let transaction = await models.sequelize.transaction();
  try {
    const reqBody = {
      ...req.body,
    };
    const response = await createOrUpdateEmployee(reqBody, transaction);
    transaction.commit();
    res.status(201).send(response);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
});

router.put("/:id", validate(update, {}, {}), async (req, res, next) => {
  let transaction = await models.sequelize.transaction();
  try {
    const reqBody = {
      ...req.params,
      ...req.body,
    };
    const response = await createOrUpdateEmployee(reqBody, transaction);
    transaction.commit();
    res.status(200).send(response);
  } catch (err) {
    transaction.rollback();
    next(err);
  }
});

router.delete("/:id", validate(deleteEmp, {}, {}), async (req, res, next) => {
  let transaction = await models.sequelize.transaction();
  try {
    const reqBody = {
      ...req.params,
    };
    const response = await deleteEmployee(reqBody, transaction);
    transaction.commit();
    res.status(200).send({
      success: true,
      message: "Successfully deleted employee",
    });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
});

module.exports = router;
