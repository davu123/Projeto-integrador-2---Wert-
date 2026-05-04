const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
  },
  connectionTimeout: 30000,
  requestTimeout: 30000
};

let pool;

async function getConnection() {
  if (pool) return pool;
  pool = await sql.connect(config);
  return pool;
}

module.exports = {
  sql,
  getConnection
};