const { config: getImapConfig } = require("../utils/config");
const Imap = require("imap");
var simpleParser = require("mailparser").simpleParser;
var fs = require("fs");
var Promise = require("bluebird");
Promise.longStackTraces();

let imapConfig = getImapConfig();
const imap = new Imap(imapConfig);
let data = {};
/**
 * Fetches ALL emails of a user and store in a file under allMails folder in the repository
 */
module.exports.getAllEmails = () => {
  try {
    Promise.promisifyAll(imap);
    // Emitted when a connection to the server has been made and authentication was successful.
    imap.once("ready", execute);
    // Emitted when new mail arrives in the currently open mailbox
    imap.on("mail", (numNewMsgs) => {
      console.log("Number of new Mails: " + numNewMsgs);
    });
    // Emitted when new mail is expunged or deleted in the currently open mailbox
    imap.on("expunge", (seqno) => {
      console.log("Seqno of expunged/deleted Mail: " + seqno);
    });
    // Emitted when the mail's flags like Seen/Answered/Flagged is changed in the currently open mailbox
    imap.on("update", (seqno, info) => {
      console.log("Seqno of updated Mail: " + seqno, info);
    });
    imap.once("error", (err) => {
      console.error("Connection error: " + err.stack);
    });
    imap.once("end", () => {
      console.log("Connection ended");
      console.log("Ending execution.");
    });

    imap.connect();
  } catch (e) {
    console.log(
      "Something went wrong. Please contact support @ iamrajatsing1@gmail.com",
      e
    );
    imap.once("end", () => {
      console.log("Connection ended");
    });
  }
};

function execute() {
  console.log("Connection ready.");
  console.log("Starting execution....");
  const ALLEMAILS = "ALL";
  const fromDate = "April 23, 2021";
  const searchCriteria = [ALLEMAILS, ["SINCE", fromDate]];
  // Open the Mail box
  imap.openBox("INBOX", false, (err, mailBox) => {
    if (err) {
      console.error(
        "Could not openBox. Please contact support @ iamrajatsingh1@gmail.com. " +
          err
      );
      return;
    }
    imap.search(searchCriteria, (err2, results) => {
      if (err2) {
        console.log(
          "Could not fetch mails. Please contact support @ iamrajatsingh1@gmail.com." +
            err2
        );
        imap.end();
        return;
      }
      if (!results || !results.length) {
        console.log("No unread mails");
        imap.end();
        return;
      }
      const f = imap.fetch(results, { bodies: "" });
      f.on("message", processMessage);

      f.once("error", (ex) => {
        return Promise.reject(ex);
      });
      f.once("end", () => {
        console.log("Done fetching all messages!");
        imap.end();
      });
    });
  });
}
function processMessage(msg, seqno) {
  console.log("Processing msg #" + seqno);
  msg.on("body", (stream) => {
    simpleParser(stream, async (err, parsedData) => {
      const { from, to, subject, textAsHtml, text, date } = parsedData;
      data["seqno"] = seqno;
      data["subject"] = subject;
      data["from"] = from;
      data["to"] = to;
      data["timestamp"] = date;
      data["text"] = text;
      data["html"] = textAsHtml;
    });
  });
  msg.once("end", function () {
    if (Object.keys(data).length > 0) {
      var jsonContent = JSON.stringify(JSON.stringify(data));
      fs.writeFile(
        "allMails/mail-" + seqno + ".json",
        jsonContent,
        "utf8",
        function (err) {
          if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
          }
          console.log("Finished & JSON file has been saved#" + seqno);
        }
      );
    }
  });
}
