const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.email.smtp_host,
  port: config.email.smtp_port,
  secure: config.email.smtp_port == 465, 
  auth: {
    user: config.email.smtp_user,
    pass: config.email.smtp_pass
  }
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.email.smtp_user}>`,
    to,
    subject,
    text
  });
};

module.exports = { sendEmail };
