require('dotenv').config();
const { sql, getDatabaseConfig, getDatabaseDiagnostics } = require('./database');

const databaseName = process.env.DB_DATABASE || 'EcoTrackWertApp';

const adminHash =
  '$2b$10$3859cQ4sn3vEeG4yOHp.J.gIIdg3ZVlA.nOx8/qRwXvJ92DTSvpJO';

async function runBatch(pool, batches) {
  for (const batch of batches) {
    await pool.request().query(batch);
  }
}

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDatabaseSchema() {
  let lastError;
  const maxAttempts = Number(process.env.DB_SCHEMA_ATTEMPTS || 3);
  const retryDelayMs = Number(process.env.DB_SCHEMA_RETRY_DELAY_MS || 2000);

  console.log('[schema] validando/criando schema do banco:', getDatabaseDiagnostics(databaseName));

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

      const pool = await new sql.ConnectionPool(getDatabaseConfig(databaseName)).connect();

      await runBatch(pool, [
        `
        IF OBJECT_ID('dbo.usuario', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.usuario (
            id INT IDENTITY(1,1) PRIMARY KEY,
            nome NVARCHAR(150) NOT NULL,
            email NVARCHAR(150) NOT NULL UNIQUE,
            senha_hash NVARCHAR(255) NOT NULL,
            perfil NVARCHAR(30) NOT NULL,
            ativo BIT NOT NULL DEFAULT 1,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            CONSTRAINT CK_usuario_perfil CHECK (perfil IN ('administrador', 'tecnico', 'gestor', 'auditor'))
          );
        END
        `,
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_usuario_email') CREATE INDEX IX_usuario_email ON dbo.usuario(email);",
        `
        IF OBJECT_ID('dbo.agencia', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.agencia (
            id INT IDENTITY(1,1) PRIMARY KEY,
            nome NVARCHAR(150) NOT NULL,
            codigo_agencia NVARCHAR(20) NOT NULL UNIQUE,
            cidade NVARCHAR(100) NOT NULL,
            uf CHAR(2) NOT NULL,
            responsavel NVARCHAR(150) NULL,
            telefone NVARCHAR(20) NULL,
            criada_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizada_em DATETIME2 NOT NULL DEFAULT SYSDATETIME()
          );
        END
        `,
        `
        IF OBJECT_ID('dbo.lote', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.lote (
            id INT IDENTITY(1,1) PRIMARY KEY,
            data_coleta DATE NOT NULL,
            agencia_id INT NOT NULL,
            tecnico_id INT NOT NULL,
            status NVARCHAR(30) NOT NULL DEFAULT 'pendente',
            observacoes NVARCHAR(500) NULL,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            CONSTRAINT FK_lote_agencia FOREIGN KEY (agencia_id) REFERENCES dbo.agencia(id),
            CONSTRAINT FK_lote_tecnico FOREIGN KEY (tecnico_id) REFERENCES dbo.usuario(id),
            CONSTRAINT CK_lote_status CHECK (status IN ('pendente', 'em_triagem', 'concluido'))
          );
        END
        `,
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_lote_agencia_id') CREATE INDEX IX_lote_agencia_id ON dbo.lote(agencia_id);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_lote_tecnico_id') CREATE INDEX IX_lote_tecnico_id ON dbo.lote(tecnico_id);",
        `
        IF OBJECT_ID('dbo.equipamento', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.equipamento (
            id INT IDENTITY(1,1) PRIMARY KEY,
            lote_id INT NOT NULL,
            tipo NVARCHAR(100) NOT NULL,
            marca NVARCHAR(100) NOT NULL,
            modelo NVARCHAR(100) NOT NULL,
            numero_serie NVARCHAR(100) NULL,
            estado NVARCHAR(30) NOT NULL,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            CONSTRAINT FK_equipamento_lote FOREIGN KEY (lote_id) REFERENCES dbo.lote(id),
            CONSTRAINT CK_equipamento_estado CHECK (estado IN ('bom', 'danificado', 'inutilizavel'))
          );
        END
        `,
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_equipamento_lote_id') CREATE INDEX IX_equipamento_lote_id ON dbo.equipamento(lote_id);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UX_equipamento_numero_serie') CREATE UNIQUE INDEX UX_equipamento_numero_serie ON dbo.equipamento(numero_serie) WHERE numero_serie IS NOT NULL;",
        `
        IF OBJECT_ID('dbo.destinacao', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.destinacao (
            id INT IDENTITY(1,1) PRIMARY KEY,
            equipamento_id INT NOT NULL UNIQUE,
            tipo_destino NVARCHAR(30) NOT NULL,
            empresa NVARCHAR(150) NOT NULL,
            data DATE NOT NULL,
            certificado_url NVARCHAR(500) NULL,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            CONSTRAINT FK_destinacao_equipamento FOREIGN KEY (equipamento_id) REFERENCES dbo.equipamento(id),
            CONSTRAINT CK_destinacao_tipo CHECK (tipo_destino IN ('reciclagem', 'reuso', 'destruicao'))
          );
        END
        `,
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_destinacao_equipamento_id') CREATE INDEX IX_destinacao_equipamento_id ON dbo.destinacao(equipamento_id);",
      ]);

      await pool
        .request()
        .input('senha_hash', sql.NVarChar, adminHash)
        .query(`
          IF NOT EXISTS (SELECT 1 FROM dbo.usuario WHERE email = 'admin@wert.com.br')
          BEGIN
            INSERT INTO dbo.usuario (nome, email, senha_hash, perfil, ativo)
            VALUES ('Administrador EcoTrack', 'admin@wert.com.br', @senha_hash, 'administrador', 1);
          END
        `);

      await pool.close();
      console.log('[schema] schema validado com sucesso.');
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
