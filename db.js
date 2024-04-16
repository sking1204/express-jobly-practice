//workaround:

const { Client } = require("pg");

let databaseName = "jobly2";  // Default to production database

if (process.env.NODE_ENV && process.env.NODE_ENV === "test") {
  databaseName = "jobly_test2";  // Use test database if NODE_ENV is set to "test"
}

const client = new Client({
  host: "/var/run/postgresql/",
  database: databaseName,
});

client.connect();

module.exports = client;


//sb provided code:

// "use strict";
// /** Database setup for jobly. */
// const { Client } = require("pg");
// const { getDatabaseUri } = require("./config");

// let db;

// if (process.env.NODE_ENV === "production") {
//   db = new Client({
//     connectionString: getDatabaseUri(),
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });
// } else {
//   db = new Client({
//     connectionString: getDatabaseUri()
//   });
// }

// db.connect();

// module.exports = db;