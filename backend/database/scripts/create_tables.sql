IF DB_ID('EcoTrackWert') IS NULL
BEGIN
    CREATE DATABASE EcoTrackWert;
END
GO

USE EcoTrackWert;
GO

IF OBJECT_ID('dbo.relatorio', 'U') IS NOT NULL DROP TABLE dbo.relatorio;
IF OBJECT_ID('dbo.destinacao', 'U') IS NOT NULL DROP TABLE dbo.destinacao;
IF OBJECT_ID('dbo.equipamento', 'U') IS NOT NULL DROP TABLE dbo.equipamento;
IF OBJECT_ID('dbo.lote', 'U') IS NOT NULL DROP TABLE dbo.lote;
IF OBJECT_ID('dbo.agencia', 'U') IS NOT NULL DROP TABLE dbo.agencia;
IF OBJECT_ID('dbo.usuario', 'U') IS NOT NULL DROP TABLE dbo.usuario;
GO

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
GO

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
GO

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
GO

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
GO

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
GO

CREATE TABLE dbo.relatorio (
    id INT IDENTITY(1,1) PRIMARY KEY,
    lote_id INT NOT NULL,
    gerado_por INT NULL,
    data_geracao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    arquivo_pdf_url NVARCHAR(500) NOT NULL,
    CONSTRAINT FK_relatorio_lote FOREIGN KEY (lote_id) REFERENCES dbo.lote(id),
    CONSTRAINT FK_relatorio_usuario FOREIGN KEY (gerado_por) REFERENCES dbo.usuario(id)
);
GO

CREATE INDEX IX_lote_agencia_id ON dbo.lote(agencia_id);
CREATE INDEX IX_lote_tecnico_id ON dbo.lote(tecnico_id);
CREATE INDEX IX_equipamento_lote_id ON dbo.equipamento(lote_id);
CREATE UNIQUE INDEX UX_equipamento_numero_serie ON dbo.equipamento(numero_serie) WHERE numero_serie IS NOT NULL;
CREATE INDEX IX_usuario_email ON dbo.usuario(email);
CREATE INDEX IX_destinacao_equipamento_id ON dbo.destinacao(equipamento_id);
CREATE INDEX IX_relatorio_lote_id ON dbo.relatorio(lote_id);
GO
