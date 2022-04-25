// ! dependencies
const express = require("express");
require("dotenv").config();
// ! controllers
const {
  readAllEmailsController,
} = require("./src/controllers/emails.controller");
// ! Initialize Express
const expressApp = express();

/**
 * This Script 
 * Establishes a secure TCP connection to the IMAP server
 * Fetches all emails
 * stores the parsed data of the email in JSON file under allMails folder in the repository
 * Keeps listening to the new emails/updated emails
 *  */ 
readAllEmailsController();

const port = process.env.PORT || 8001;
expressApp.listen(port, () => {
  console.log("*** Service running on port", port, "***");
});
