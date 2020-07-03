const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const process = require('process');

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: process.platform == 'win32' ? 3306 : '/var/run/mysqld/mysqld.sock'
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
  console.log(process.platform);
});

module.exports = connection;