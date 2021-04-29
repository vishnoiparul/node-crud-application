const sgMail = require("@sendgrid/mail");
const _ = require("lodash");
const config = require("../configs");
const logger = require("../utils/logger");

sgMail.setApiKey(config.sendgridKey);

const getMailTemplate = (data) => {
  const { firstName, lastName, link = "#" } = data;
  let name = [firstName, lastName];
  name = _.join(name, " ");
  return {
    subject: "Reset Your Password",
    html: `<div style="text-align:center;font-size:16px;padding:15px">
          <p style="font-size: 24px">RESET YOUR PASSWORD</p>
          <br />
          Hi ${name}<br />
          We're sending you the email because you requested a password reset.
          Click on the link to create a new password:<br /><br />
          <a href=${link}>
          <button style="background-color:green;color: white;font-weight:600;font-size:20px;border-radius:10px">
            Set a new password
          </button>
          </a><br /><br />
          The link will expire in 24 hours. After that you will need to submit new request to reset your password. <br />
          If you didn't request a password reset, you can ignore this email. Your password will not be changed.<br/>
          Thanks`,
  };
};

const sendMail = async ({ firstName, lastName, link = "#", email }) => {
  const msg = {
    ...getMailTemplate({
      link,
      firstName,
      lastName,
    }),
    to: email,
    from: "node-app@example.com",
  };

  logger.info(JSON.stringify(msg));

  await sgMail.send(msg);
  return {
    success: true,
    message: "Mail sent successfully",
  };
};

module.exports = {
  sendMail,
};
