const { getAllEmails } = require("../services/emails.service");

module.exports.readAllEmailsController = () => {
  getAllEmails();
};
