require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  app: process.env.APP,
  jwtSecret: process.env.JWT_SECRET,
  sendgridKey: process.env.SD_ENCRYPTION_KEY,
  hostName: process.env.HOST_NAME,
};
