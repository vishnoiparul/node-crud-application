const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const apiRouter = require("../routes");
const errorHandler = require("../middlewares/error-handler");

// Swagger File loader
const swaggerDoc = YAML.load("./swagger.yaml");

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use("/api/v1", apiRouter);
app.use(errorHandler.handleNotFound);
app.use(errorHandler.handleError);

module.exports = app;
