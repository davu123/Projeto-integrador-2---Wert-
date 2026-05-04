USE EcoTrackWert;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.usuario WHERE email = 'admin@wert.com.br')
BEGIN
    INSERT INTO dbo.usuario (nome, email, senha_hash, perfil, ativo)
    VALUES (
        'Administrador EcoTrack',
        'admin@wert.com.br',
        '$2b$10$3859cQ4sn3vEeG4yOHp.J.gIIdg3ZVlA.nOx8/qRwXvJ92DTSvpJO',
        'administrador',
        1
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.usuario WHERE email = 'tecnico@wert.com.br')
BEGIN
    INSERT INTO dbo.usuario (nome, email, senha_hash, perfil, ativo)
    VALUES (
        'Técnico EcoTrack',
        'tecnico@wert.com.br',
        '$2b$10$3859cQ4sn3vEeG4yOHp.J.gIIdg3ZVlA.nOx8/qRwXvJ92DTSvpJO',
        'tecnico',
        1
    );
END
GO

IF NOT EXISTS (SELECT 1 FROM dbo.agencia WHERE codigo_agencia = '0001')
BEGIN
    INSERT INTO dbo.agencia (nome, codigo_agencia, cidade, uf, responsavel, telefone)
    VALUES ('Agência Banco do Brasil Asa Norte', '0001', 'Brasília', 'DF', 'Responsável Exemplo', '61999999999');
END
GO

DECLARE @agenciaId INT;
DECLARE @tecnicoId INT;
SELECT TOP 1 @agenciaId = id FROM dbo.agencia WHERE codigo_agencia = '0001';
SELECT TOP 1 @tecnicoId = id FROM dbo.usuario WHERE email = 'tecnico@wert.com.br';

IF NOT EXISTS (SELECT 1 FROM dbo.lote WHERE observacoes = 'Lote inicial para desenvolvimento')
BEGIN
    INSERT INTO dbo.lote (data_coleta, agencia_id, tecnico_id, status, observacoes)
    VALUES (GETDATE(), @agenciaId, @tecnicoId, 'pendente', 'Lote inicial para desenvolvimento');
END
GO
