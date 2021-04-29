const http = require("http");

const app = require("./services/express");
const configs = require("./configs");
const logger = require("./utils/logger");

const port = parseInt(configs.port, 10) || 8000;
app.set("port", port);

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    logger.error(`Error : ${err}`);
    process.exit(-1);
  }
  logger.info(`${configs.app} is running on ${configs.port}`);
});
