const mysql = require("mysql2/promise");
require("dotenv").config();

var service = {
  pool: mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }),
  ps: async function (statement, input = []) {
    var query = await this.pool.format(statement, input);
    return query;
  },
};

module.exports = service;
