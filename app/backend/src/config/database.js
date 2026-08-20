const fs = require('fs');
const sql = require('mssql');
require('dotenv').config();

const REQUIRED_ENV = ['DB_USER', 'DB_PASSWORD', 'DB_SERVER', 'DB_DATABASE'];

function isRunningInDocker() {
  return process.env.RUNNING_IN_DOCKER === 'true' || fs.existsSync('/.dockerenv');
}

function resolveDbServer() {
  const configuredServer = process.env.DB_SERVER || '127.0.0.1';

  if (configuredServer === 'db' && !isRunningInDocker()) {
    return '127.0.0.1';
  }

  return configuredServer;
}

function validateDatabaseEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Variaveis de banco ausentes no .env: ${missing.join(', ')}`);
  }
}

function getDatabaseConfig(database = process.env.DB_DATABASE) {
  validateDatabaseEnv();

  return {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: resolveDbServer(),
    database,
    port: Number(process.env.DB_PORT || 1433),
    options: {
      encrypt: process.env.DB_ENCRYPT === 'true',
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    },
    connectionTimeout: Number(process.env.DB_CONNECTION_TIMEOUT || 10000),
    requestTimeout: Number(process.env.DB_REQUEST_TIMEOUT || 15000),
  };
}

function getDatabaseDiagnostics(database = process.env.DB_DATABASE) {
  const config = getDatabaseConfig(database);

  return {
    server: config.server,
    port: config.port,
    database: config.database,
    user: config.user,
    encrypt: config.options.encrypt,
    trustServerCertificate: config.options.trustServerCertificate,
    connectionTimeout: config.connectionTimeout,
    requestTimeout: config.requestTimeout,
  };
}

let pool;

async function getConnection() {
  if (pool) return pool;

  const config = getDatabaseConfig();
  console.log('[database] tentando conexao SQL Server:', getDatabaseDiagnostics());
  pool = await new sql.ConnectionPool(config).connect();

  return pool;
}

module.exports = {
  sql,
  getConnection,
  getDatabaseConfig,
  getDatabaseDiagnostics,
};
