const express = require("express");
const validator = require("express-validation");

const router = express.Router();

const authRouter = require("./api/auth.route");
const employeeRouter = require("./api/employee.route");

router.get("/", (req, res) => {
  res.json({
    message: "Server is up",
  });
});

router.use("/auth", authRouter);
router.use("/employee", employeeRouter);

module.exports = router;
