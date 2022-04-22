const { getAllEmails } = require("../services/getAllEmails.service");

module.exports.readAllEmailsController = () => {
  getAllEmails();
};
