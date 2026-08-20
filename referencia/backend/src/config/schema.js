require('dotenv').config();
const { sql, getDatabaseConfig, getDatabaseDiagnostics } = require('./database');

const databaseName = process.env.DB_DATABASE || 'EcoTrackWert';

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
      console.log(`[schema] tentativa ${attempt}/${maxAttempts}: conectando ao banco master...`);

      const masterPool = await new sql.ConnectionPool({
        ...getDatabaseConfig('master'),
      }).connect();

      console.log(`[schema] garantindo existencia do banco ${databaseName}...`);
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

      console.log(`[schema] conectando ao banco ${databaseName} para validar tabelas...`);
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
        `
        IF OBJECT_ID('dbo.relatorio', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.relatorio (
            id INT IDENTITY(1,1) PRIMARY KEY,
            lote_id INT NOT NULL,
            gerado_por INT NULL,
            data_geracao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            arquivo_pdf_url NVARCHAR(500) NOT NULL,
            CONSTRAINT FK_relatorio_lote FOREIGN KEY (lote_id) REFERENCES dbo.lote(id),
            CONSTRAINT FK_relatorio_usuario FOREIGN KEY (gerado_por) REFERENCES dbo.usuario(id)
          );
        END
        `,
      ]);

      await runBatch(pool, [
        `
        IF EXISTS (SELECT 1 FROM sys.key_constraints WHERE name = 'UQ_equipamento_numero_serie')
        BEGIN
          ALTER TABLE dbo.equipamento DROP CONSTRAINT UQ_equipamento_numero_serie;
        END
        `,
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_lote_agencia_id') CREATE INDEX IX_lote_agencia_id ON dbo.lote(agencia_id);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_lote_tecnico_id') CREATE INDEX IX_lote_tecnico_id ON dbo.lote(tecnico_id);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_equipamento_lote_id') CREATE INDEX IX_equipamento_lote_id ON dbo.equipamento(lote_id);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'UX_equipamento_numero_serie') CREATE UNIQUE INDEX UX_equipamento_numero_serie ON dbo.equipamento(numero_serie) WHERE numero_serie IS NOT NULL;",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_usuario_email') CREATE INDEX IX_usuario_email ON dbo.usuario(email);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_destinacao_equipamento_id') CREATE INDEX IX_destinacao_equipamento_id ON dbo.destinacao(equipamento_id);",
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_relatorio_lote_id') CREATE INDEX IX_relatorio_lote_id ON dbo.relatorio(lote_id);",
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

          IF NOT EXISTS (SELECT 1 FROM dbo.usuario WHERE email = 'tecnico@wert.com.br')
          BEGIN
            INSERT INTO dbo.usuario (nome, email, senha_hash, perfil, ativo)
            VALUES (N'T\u00e9cnico EcoTrack', 'tecnico@wert.com.br', @senha_hash, 'tecnico', 1);
          END

          IF NOT EXISTS (SELECT 1 FROM dbo.agencia WHERE codigo_agencia = '0001')
          BEGIN
            INSERT INTO dbo.agencia (nome, codigo_agencia, cidade, uf, responsavel, telefone)
            VALUES (N'Ag\u00eancia Banco do Brasil Asa Norte', '0001', N'Bras\u00edlia', 'DF', N'Respons\u00e1vel Exemplo', '61999999999');
          END

          UPDATE dbo.usuario
          SET nome = N'T\u00e9cnico EcoTrack'
          WHERE email = 'tecnico@wert.com.br' AND nome = 'Tecnico EcoTrack';

          UPDATE dbo.agencia
          SET
            nome = N'Ag\u00eancia Banco do Brasil Asa Norte',
            cidade = N'Bras\u00edlia',
            responsavel = N'Respons\u00e1vel Exemplo'
          WHERE codigo_agencia = '0001';

          DECLARE @agenciaId INT;
          DECLARE @tecnicoId INT;
          SELECT TOP 1 @agenciaId = id FROM dbo.agencia WHERE codigo_agencia = '0001';
          SELECT TOP 1 @tecnicoId = id FROM dbo.usuario WHERE email = 'tecnico@wert.com.br';

          IF @agenciaId IS NOT NULL
            AND @tecnicoId IS NOT NULL
            AND NOT EXISTS (SELECT 1 FROM dbo.lote WHERE observacoes = 'Lote inicial para desenvolvimento')
          BEGIN
            INSERT INTO dbo.lote (data_coleta, agencia_id, tecnico_id, status, observacoes)
            VALUES (CONVERT(date, GETDATE()), @agenciaId, @tecnicoId, 'pendente', 'Lote inicial para desenvolvimento');
          END
        `);

      await pool.close();
      console.log('[schema] schema validado com sucesso.');
      return;
    } catch (error) {
      lastError = error;
      console.error(`[schema] falha na tentativa ${attempt}/${maxAttempts}: ${error.message}`);

      if (attempt < maxAttempts) {
        await wait(retryDelayMs);
      }
    }
  }

  throw lastError;
}

module.exports = { ensureDatabaseSchema };
