require("dotenv").config();
module.exports.config = () => {
  let env = process.env.NODE_ENV || "";
  let configObj;

  switch (env) {
    case "development":
      configObj = {
        user: process.env.IMAP_DEV_USER,
        password: process.env.IMAP_DEV_PASSWORD,
        host: process.env.IMAP_DEV_HOST,
        port: process.env.IMAP_DEV_PORT,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
      };
      break;
    case "test":
      configObj = {
        user: process.env.IMAP_TEST_USER,
        password: process.env.IMAP_TEST_PASSWORD,
        host: process.env.IMAP_TEST_HOST,
        port: process.env.IMAP_TEST_PORT,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
      };
      break;
    case "production":
      configObj = {
        user: process.env.IMAP_PROD_USER,
        password: process.env.IMAP_PROD_PASSWORD,
        host: process.env.IMAP_PROD_HOST,
        port: process.env.IMAP_PROD_PORT,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
      };
      break;
    default:
      configObj = {
        user: process.env.IMAP_DEV_USER,
        password: process.env.IMAP_DEV_PASSWORD,
        host: process.env.IMAP_DEV_HOST,
        port: process.env.IMAP_DEV_PORT,
        tls: true,
        tlsOptions: { rejectUnauthorized: false }
      };
      break;
  }
  console.log(`Running in ${env} environment.`);
  return configObj;
};
