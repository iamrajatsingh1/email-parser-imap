## Author: Rajat Singh (iamrajatsingh1@gmail.com)
## Service: Email Service
## Description: 
    ● Establishes a secure TCP connection to the IMAP server using Nodejs.
    ● Fetch all the emails from the mailbox.
    ● Store the details within the following headings : from, to, subject, timestamp, text, and HTML
    of all the emails in a JSON file.
    ● Listen for any new updates in the mailbox (new message, deleted messages etc) and prints it in
    the console.

Pre-requisites: 
## Available Scripts
Step 1:
### `npm i`
To install the modules required by the service


Step 2: 
create the .env file with following entries

`NODE_ENV=development || test || production
IMAP_DEV_USER=your_dev_email@gmail.com
IMAP_DEV_PASSWORD=secret
IMAP_DEV_HOST=imap.gmail.com
IMAP_DEV_PORT=993

IMAP_TEST_USER=your_test_email@gmail.com
IMAP_TEST_PASSWORD=secret
IMAP_TEST_HOST=imap.gmail.com
IMAP_TEST_PORT=993

IMAP_PROD_USER=your_prod_email@gmail.com
IMAP_PROD_PASSWORD=secret
IMAP_PROD_HOST=imap.gmail.com
IMAP_PROD_PORT=993`

Step 3:
### `npm run start`
This will run the app in the production mode.<br>
