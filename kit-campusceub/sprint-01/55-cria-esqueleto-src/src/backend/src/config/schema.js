require('dotenv').config();
const { sql, getDatabaseConfig, getDatabaseDiagnostics } = require('./database');

const databaseName = process.env.DB_DATABASE || 'EcoTrackWertApp';

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDatabaseSchema() {
  let lastError;
  const maxAttempts = Number(process.env.DB_SCHEMA_ATTEMPTS || 3);
  const retryDelayMs = Number(process.env.DB_SCHEMA_RETRY_DELAY_MS || 2000);

  console.log('[schema] validando/criando banco vazio:', getDatabaseDiagnostics(databaseName));

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const masterPool = await new sql.ConnectionPool({
        ...getDatabaseConfig('master'),
      }).connect();

      await masterPool
        .request()
        .input('databaseName', sql.NVarChar, databaseName)
        .query(`
          IF DB_ID(@databaseName) IS NULL
          BEGIN
            DECLARE @sql NVARCHAR(MAX) = N'CREATE DATABASE [' + REPLACE(@databaseName, ']', ']]') + N']';
            EXEC(@sql);
          END
        `);

      await masterPool.close();
      console.log(`[schema] banco ${databaseName} garantido (sem tabelas de dominio nesta fase).`);
      return;
    } catch (error) {
      lastError = error;
      console.error(`[schema] tentativa ${attempt} falhou:`, error.message);
      if (attempt < maxAttempts) {
        await wait(retryDelayMs);
      }
    }
  }

  throw lastError;
}

module.exports = { ensureDatabaseSchema };
