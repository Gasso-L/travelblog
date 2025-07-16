const sgMail = require("@sendgrid/mail");
require("dotenv").config();

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(to, subject, message) {
    try {
      const messageOption = {
        to,
        from: "lorenzo.crf.dev@gmail.com",
        subject,
        html: message,
      };

      await sgMail.send(messageOption);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = EmailService;
