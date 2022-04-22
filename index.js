// ! dependencies
const express = require("express");
require("dotenv").config();
// ! controllers
const {
  readAllEmailsController,
} = require("./src/controllers/getAllEmails.controller");
// ! Initialize Express
const expressApp = express();

/**
 * fetches all emails
 * stores the data in JSON file under allMails folder in the repository
 *  */ 
readAllEmailsController();

const port = process.env.PORT || 8001;
expressApp.listen(port, () => {
  console.log("*** Service running on port", port, "***");
});
