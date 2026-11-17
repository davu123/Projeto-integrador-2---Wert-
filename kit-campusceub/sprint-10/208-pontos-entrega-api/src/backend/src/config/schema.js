require('dotenv').config();

const bcrypt = require('bcrypt');
const {
  sql,
  getDatabaseConfig,
  getDatabaseDiagnostics,
} = require('./database');

const databaseName = process.env.DB_DATABASE || 'EcoTrackWertApp';

const SENHA_MINIMA = 8;

// Cria o primeiro administrador só quando o banco não tem nenhum.
// E-mail e senha vêm do ambiente (ADMIN_EMAIL e ADMIN_PASSWORD); nenhuma senha fica no código.
async function criarAdministradorInicial(pool) {
  const administrador = await pool.request().query(`
    SELECT TOP 1 id FROM dbo.usuario WHERE perfil = 'administrador'
  `);
  if (administrador.recordset[0]) return;

  const email = (process.env.ADMIN_EMAIL || '').trim();
  const senha = process.env.ADMIN_PASSWORD || '';

  if (!email || senha.length < SENHA_MINIMA) {
    console.warn(
      '[schema] nenhum administrador no banco. Defina ADMIN_EMAIL e ADMIN_PASSWORD '
        + `(mínimo de ${SENHA_MINIMA} caracteres) e reinicie a API para criar o primeiro acesso.`
    );
    return;
  }

  const emailEmUso = await pool.request().input('email', sql.NVarChar, email).query(`
    SELECT TOP 1 id FROM dbo.usuario WHERE email = @email
  `);
  if (emailEmUso.recordset[0]) {
    console.warn('[schema] ADMIN_EMAIL já pertence a um usuário que não é administrador. Nenhum administrador foi criado.');
    return;
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const criacao = await pool
    .request()
    .input('nome', sql.NVarChar, (process.env.ADMIN_NOME || '').trim() || 'Administrador EcoTrack')
    .input('email', sql.NVarChar, email)
    .input('senha_hash', sql.NVarChar, senhaHash)
    .query(`
      INSERT INTO dbo.usuario (nome, email, senha_hash, perfil, ativo)
      SELECT @nome, @email, @senha_hash, 'administrador', 1
      WHERE NOT EXISTS (
        SELECT 1 FROM dbo.usuario WITH (UPDLOCK, HOLDLOCK)
        WHERE perfil = 'administrador'
      ) AND NOT EXISTS (
        SELECT 1 FROM dbo.usuario WITH (UPDLOCK, HOLDLOCK)
        WHERE email = @email
      );
    `);

  if (criacao.rowsAffected[0] > 0) {
    console.log(`[schema] administrador inicial criado: ${email}. Troque a senha no primeiro acesso.`);
  }
}

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

  // O SQL Server pode levar perto de um minuto para aceitar conexão na primeira subida.
  const maxAttempts = Number(
    process.env.DB_SCHEMA_ATTEMPTS || 20
  );

  const retryDelayMs = Number(
    process.env.DB_SCHEMA_RETRY_DELAY_MS || 3000
  );

  if (!Number.isInteger(maxAttempts) || maxAttempts < 1
    || !Number.isInteger(retryDelayMs) || retryDelayMs < 0) {
    throw new Error('DB_SCHEMA_ATTEMPTS deve ser um inteiro positivo e DB_SCHEMA_RETRY_DELAY_MS um inteiro não negativo.');
  }

  console.log(
    '[schema] validando/criando schema do banco:',
    getDatabaseDiagnostics(databaseName)
  );

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    let masterPool;
    let pool;
    try {
      masterPool = new sql.ConnectionPool(getDatabaseConfig('master'));
      await masterPool.connect();

      await masterPool
        .request()
        .input('databaseName', sql.NVarChar, databaseName)
        .query(`
          IF DB_ID(@databaseName) IS NULL
          BEGIN
            DECLARE @sql NVARCHAR(MAX) =
              N'CREATE DATABASE [' +
              REPLACE(@databaseName, ']', ']]') +
              N']';

            EXEC(@sql);
          END
        `);

      await masterPool.close();

      pool = new sql.ConnectionPool(getDatabaseConfig(databaseName));
      await pool.connect();

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

            CONSTRAINT CK_usuario_perfil
              CHECK (
                perfil IN (
                  'administrador',
                  'tecnico',
                  'gestor',
                  'auditor',
                  'motorista'
                )
              )
          );
        END
        `,

        `
        IF OBJECT_ID('dbo.usuario', 'U') IS NOT NULL
        BEGIN
          IF EXISTS (
            SELECT 1
            FROM sys.check_constraints
            WHERE name = 'CK_usuario_perfil'
              AND parent_object_id = OBJECT_ID('dbo.usuario')
              AND definition NOT LIKE '%motorista%'
          )
          BEGIN
            ALTER TABLE dbo.usuario
              DROP CONSTRAINT CK_usuario_perfil;

            ALTER TABLE dbo.usuario
              WITH CHECK ADD CONSTRAINT CK_usuario_perfil
              CHECK (
                perfil IN (
                  'administrador',
                  'tecnico',
                  'gestor',
                  'auditor',
                  'motorista'
                )
              );

            ALTER TABLE dbo.usuario
              CHECK CONSTRAINT CK_usuario_perfil;
          END

          IF NOT EXISTS (
            SELECT 1
            FROM sys.check_constraints
            WHERE name = 'CK_usuario_perfil'
              AND parent_object_id = OBJECT_ID('dbo.usuario')
          )
          BEGIN
            ALTER TABLE dbo.usuario
              WITH CHECK ADD CONSTRAINT CK_usuario_perfil
              CHECK (
                perfil IN (
                  'administrador',
                  'tecnico',
                  'gestor',
                  'auditor',
                  'motorista'
                )
              );

            ALTER TABLE dbo.usuario
              CHECK CONSTRAINT CK_usuario_perfil;
          END
        END
        `,

        `
        IF NOT EXISTS (
          SELECT 1
          FROM sys.indexes
          WHERE name = 'IX_usuario_email'
        )
        CREATE INDEX IX_usuario_email
          ON dbo.usuario(email);
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
        IF COL_LENGTH('dbo.agencia', 'cep') IS NULL
          ALTER TABLE dbo.agencia ADD cep CHAR(8) NULL;
        `,
        `
        IF COL_LENGTH('dbo.agencia', 'endereco') IS NULL
          ALTER TABLE dbo.agencia ADD endereco NVARCHAR(200) NULL;
        `,
        `
        IF COL_LENGTH('dbo.agencia', 'latitude') IS NULL
          ALTER TABLE dbo.agencia ADD latitude DECIMAL(9,6) NULL;
        `,
        `
        IF COL_LENGTH('dbo.agencia', 'longitude') IS NULL
          ALTER TABLE dbo.agencia ADD longitude DECIMAL(9,6) NULL;
        `,
        `
        IF NOT EXISTS (
          SELECT 1 FROM sys.check_constraints
          WHERE name = 'CK_agencia_cep'
            AND parent_object_id = OBJECT_ID('dbo.agencia')
        )
          ALTER TABLE dbo.agencia WITH CHECK ADD CONSTRAINT CK_agencia_cep
            CHECK (cep IS NULL OR (LEN(cep) = 8 AND cep NOT LIKE '%[^0-9]%'));
        `,
        `
        IF NOT EXISTS (
          SELECT 1 FROM sys.check_constraints
          WHERE name = 'CK_agencia_coordenadas'
            AND parent_object_id = OBJECT_ID('dbo.agencia')
        )
          ALTER TABLE dbo.agencia WITH CHECK ADD CONSTRAINT CK_agencia_coordenadas
            CHECK (
              (latitude IS NULL AND longitude IS NULL)
              OR (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
            );
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

            CONSTRAINT FK_lote_agencia
              FOREIGN KEY (agencia_id)
              REFERENCES dbo.agencia(id),

            CONSTRAINT FK_lote_tecnico
              FOREIGN KEY (tecnico_id)
              REFERENCES dbo.usuario(id),

            CONSTRAINT CK_lote_status
              CHECK (
                status IN (
                  'pendente',
                  'em_triagem',
                  'concluido'
                )
              )
          );
        END
        `,

        `
        IF NOT EXISTS (
          SELECT 1
          FROM sys.indexes
          WHERE name = 'IX_lote_agencia_id'
        )
        CREATE INDEX IX_lote_agencia_id
          ON dbo.lote(agencia_id);
        `,

        `
        IF NOT EXISTS (
          SELECT 1
          FROM sys.indexes
          WHERE name = 'IX_lote_tecnico_id'
        )
        CREATE INDEX IX_lote_tecnico_id
          ON dbo.lote(tecnico_id);
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

            CONSTRAINT FK_equipamento_lote
              FOREIGN KEY (lote_id)
              REFERENCES dbo.lote(id),

            CONSTRAINT CK_equipamento_estado
              CHECK (
                estado IN (
                  'bom',
                  'danificado',
                  'inutilizavel'
                )
              )
          );
        END
        `,

        `
        IF NOT EXISTS (
          SELECT 1
          FROM sys.indexes
          WHERE name = 'IX_equipamento_lote_id'
        )
        CREATE INDEX IX_equipamento_lote_id
          ON dbo.equipamento(lote_id);
        `,

        `
        IF NOT EXISTS (
          SELECT 1
          FROM sys.indexes
          WHERE name = 'UX_equipamento_numero_serie'
        )
        CREATE UNIQUE INDEX UX_equipamento_numero_serie
          ON dbo.equipamento(numero_serie)
          WHERE numero_serie IS NOT NULL;
        `,

        `
        IF OBJECT_ID('dbo.destinacao', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.destinacao (
            id INT IDENTITY(1,1) PRIMARY KEY,
            equipamento_id INT NOT NULL,
            tipo_destino NVARCHAR(30) NOT NULL,
            empresa NVARCHAR(150) NOT NULL,
            data DATE NOT NULL,
            certificado_url NVARCHAR(2048) NULL,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

            CONSTRAINT FK_destinacao_equipamento
              FOREIGN KEY (equipamento_id)
              REFERENCES dbo.equipamento(id),

            CONSTRAINT UQ_destinacao_equipamento
              UNIQUE (equipamento_id),

            CONSTRAINT CK_destinacao_tipo
              CHECK (
                tipo_destino IN (
                  'reciclagem',
                  'reuso',
                  'destruicao'
                )
              )
          );
        END
        `,

        `
        IF COL_LENGTH('dbo.destinacao', 'tipo') IS NOT NULL
          AND COL_LENGTH('dbo.destinacao', 'tipo_destino') IS NULL
        BEGIN
          BEGIN TRY
            BEGIN TRANSACTION;

            ALTER TABLE dbo.destinacao
              DROP CONSTRAINT CK_destinacao_tipo;

            EXEC sp_rename
              'dbo.destinacao.tipo',
              'tipo_destino',
              'COLUMN';

            EXEC(
              N'ALTER TABLE dbo.destinacao
                WITH CHECK ADD CONSTRAINT CK_destinacao_tipo
                CHECK (
                  tipo_destino IN (
                    ''reciclagem'',
                    ''reuso'',
                    ''destruicao''
                  )
                )'
            );

            COMMIT TRANSACTION;
          END TRY

          BEGIN CATCH
            IF @@TRANCOUNT > 0
              ROLLBACK TRANSACTION;

            THROW;
          END CATCH;
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

            CONSTRAINT FK_relatorio_lote
              FOREIGN KEY (lote_id)
              REFERENCES dbo.lote(id),

            CONSTRAINT FK_relatorio_usuario
              FOREIGN KEY (gerado_por)
              REFERENCES dbo.usuario(id)
          );
        END
        `,

        `
        IF OBJECT_ID('dbo.rota', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.rota (
            id INT IDENTITY(1,1) PRIMARY KEY,
            data DATE NOT NULL,
            motorista_id INT NULL,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            CONSTRAINT FK_rota_motorista FOREIGN KEY (motorista_id) REFERENCES dbo.usuario(id)
          );
        END
        `,
        "IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_rota_data') CREATE INDEX IX_rota_data ON dbo.rota(data);",
        `
        IF OBJECT_ID('dbo.parada', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.parada (
            id INT IDENTITY(1,1) PRIMARY KEY,
            rota_id INT NOT NULL,
            agencia_id INT NULL,
            lote_id INT NULL,
            ordem INT NOT NULL,
            CONSTRAINT FK_parada_rota FOREIGN KEY (rota_id) REFERENCES dbo.rota(id) ON DELETE CASCADE,
            CONSTRAINT FK_parada_agencia FOREIGN KEY (agencia_id) REFERENCES dbo.agencia(id),
            CONSTRAINT FK_parada_lote FOREIGN KEY (lote_id) REFERENCES dbo.lote(id),
            CONSTRAINT CK_parada_alvo CHECK (agencia_id IS NOT NULL OR lote_id IS NOT NULL),
            CONSTRAINT CK_parada_ordem CHECK (ordem > 0),
            CONSTRAINT UX_parada_rota_ordem UNIQUE (rota_id, ordem)
          );
        END
        `,

        `
        IF COL_LENGTH('dbo.parada', 'status_recolhimento') IS NULL
          ALTER TABLE dbo.parada ADD status_recolhimento NVARCHAR(20) NULL;
        `,
        `
        IF COL_LENGTH('dbo.parada', 'status_atualizado_em') IS NULL
          ALTER TABLE dbo.parada ADD status_atualizado_em DATETIME2 NULL;
        `,
        `
        IF NOT EXISTS (
          SELECT 1 FROM sys.check_constraints
          WHERE name = 'CK_parada_status_recolhimento'
            AND parent_object_id = OBJECT_ID('dbo.parada')
        )
          ALTER TABLE dbo.parada WITH CHECK ADD CONSTRAINT CK_parada_status_recolhimento
            CHECK (status_recolhimento IN ('recolhido', 'nao_recolhido', 'parcial'));
        `,
        `
        IF OBJECT_ID('dbo.ponto_entrega', 'U') IS NULL
        BEGIN
          CREATE TABLE dbo.ponto_entrega (
            id INT IDENTITY(1,1) PRIMARY KEY,
            nome NVARCHAR(150) NOT NULL,
            tipo NVARCHAR(20) NOT NULL,
            cep CHAR(8) NULL,
            endereco NVARCHAR(200) NOT NULL,
            cidade NVARCHAR(100) NOT NULL,
            uf CHAR(2) NOT NULL,
            latitude DECIMAL(9,6) NOT NULL,
            longitude DECIMAL(9,6) NOT NULL,
            ativo BIT NOT NULL DEFAULT 1,
            criado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            atualizado_em DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
            CONSTRAINT CK_ponto_entrega_tipo CHECK (tipo IN ('deposito', 'destinadora')),
            CONSTRAINT CK_ponto_entrega_cep CHECK (cep IS NULL OR (LEN(cep) = 8 AND cep NOT LIKE '%[^0-9]%')),
            CONSTRAINT CK_ponto_entrega_coordenadas
              CHECK (latitude BETWEEN -90 AND 90 AND longitude BETWEEN -180 AND 180)
          );
        END
        `,
      ]);

      await criarAdministradorInicial(pool);

      await pool.close();

      console.log(
        '[schema] schema validado com sucesso.'
      );

      return;
    } catch (error) {
      lastError = error;

      console.error(
        `[schema] tentativa ${attempt} falhou:`,
        error.message
      );

    } finally {
      if (pool) await pool.close();
      if (masterPool) await masterPool.close();
    }

    if (attempt < maxAttempts) {
      await wait(retryDelayMs);
    }
  }

  throw lastError;
}

module.exports = {
  ensureDatabaseSchema,
};
