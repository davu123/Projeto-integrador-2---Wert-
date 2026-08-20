const { getConnection, sql } = require('../config/database');

const STATUS_VALIDOS = ['pendente', 'em_triagem', 'concluido'];

async function listarLotes(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT
        l.id,
        l.data_coleta,
        l.agencia_id,
        a.nome AS agencia_nome,
        l.tecnico_id,
        u.nome AS tecnico_nome,
        l.status,
        l.observacoes,
        l.criado_em,
        l.atualizado_em
      FROM dbo.lote l
      INNER JOIN dbo.agencia a ON a.id = l.agencia_id
      INNER JOIN dbo.usuario u ON u.id = l.tecnico_id
      ORDER BY l.id DESC
    `);

    return res.json(result.recordset);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar lotes.',
      error: error.message
    });
  }
}

async function buscarLotePorId(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT
          l.id,
          l.data_coleta,
          l.agencia_id,
          a.nome AS agencia_nome,
          l.tecnico_id,
          u.nome AS tecnico_nome,
          l.status,
          l.observacoes,
          l.criado_em,
          l.atualizado_em
        FROM dbo.lote l
        INNER JOIN dbo.agencia a ON a.id = l.agencia_id
        INNER JOIN dbo.usuario u ON u.id = l.tecnico_id
        WHERE l.id = @id
      `);

    const lote = result.recordset[0];

    if (!lote) {
      return res.status(404).json({ message: 'Lote não encontrado.' });
    }

    return res.json(lote);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar lote.',
      error: error.message
    });
  }
}

async function criarLote(req, res) {
  try {
    const { data_coleta, agencia_id, tecnico_id, status, observacoes } = req.body;

    if (!data_coleta || !agencia_id || !tecnico_id) {
      return res.status(400).json({
        message: 'data_coleta, agencia_id e tecnico_id são obrigatórios.'
      });
    }

    const statusFinal = status || 'pendente';

    if (!STATUS_VALIDOS.includes(statusFinal)) {
      return res.status(400).json({
        message: 'Status inválido.'
      });
    }

    const pool = await getConnection();

    const agenciaExiste = await pool
      .request()
      .input('agencia_id', sql.Int, Number(agencia_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.agencia
        WHERE id = @agencia_id
      `);

    if (!agenciaExiste.recordset[0]) {
      return res.status(404).json({ message: 'Agência não encontrada.' });
    }

    const tecnicoExiste = await pool
      .request()
      .input('tecnico_id', sql.Int, Number(tecnico_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.usuario
        WHERE id = @tecnico_id
      `);

    if (!tecnicoExiste.recordset[0]) {
      return res.status(404).json({ message: 'Técnico não encontrado.' });
    }

    const result = await pool
      .request()
      .input('data_coleta', sql.Date, data_coleta)
      .input('agencia_id', sql.Int, Number(agencia_id))
      .input('tecnico_id', sql.Int, Number(tecnico_id))
      .input('status', sql.NVarChar, statusFinal)
      .input('observacoes', sql.NVarChar, observacoes || null)
      .query(`
        INSERT INTO dbo.lote (
          data_coleta,
          agencia_id,
          tecnico_id,
          status,
          observacoes
        )
        OUTPUT
          INSERTED.id,
          INSERTED.data_coleta,
          INSERTED.agencia_id,
          INSERTED.tecnico_id,
          INSERTED.status,
          INSERTED.observacoes,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        VALUES (
          @data_coleta,
          @agencia_id,
          @tecnico_id,
          @status,
          @observacoes
        )
      `);

    return res.status(201).json({
      message: 'Lote criado com sucesso.',
      lote: result.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar lote.',
      error: error.message
    });
  }
}

async function atualizarLote(req, res) {
  try {
    const { id } = req.params;
    const { data_coleta, agencia_id, tecnico_id, status, observacoes } = req.body;

    if (!data_coleta || !agencia_id || !tecnico_id || !status) {
      return res.status(400).json({
        message: 'data_coleta, agencia_id, tecnico_id e status são obrigatórios.'
      });
    }

    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        message: 'Status inválido.'
      });
    }

    const pool = await getConnection();

    const loteExiste = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.lote
        WHERE id = @id
      `);

    if (!loteExiste.recordset[0]) {
      return res.status(404).json({ message: 'Lote não encontrado.' });
    }

    const agenciaExiste = await pool
      .request()
      .input('agencia_id', sql.Int, Number(agencia_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.agencia
        WHERE id = @agencia_id
      `);

    if (!agenciaExiste.recordset[0]) {
      return res.status(404).json({ message: 'Agência não encontrada.' });
    }

    const tecnicoExiste = await pool
      .request()
      .input('tecnico_id', sql.Int, Number(tecnico_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.usuario
        WHERE id = @tecnico_id
      `);

    if (!tecnicoExiste.recordset[0]) {
      return res.status(404).json({ message: 'Técnico não encontrado.' });
    }

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .input('data_coleta', sql.Date, data_coleta)
      .input('agencia_id', sql.Int, Number(agencia_id))
      .input('tecnico_id', sql.Int, Number(tecnico_id))
      .input('status', sql.NVarChar, status)
      .input('observacoes', sql.NVarChar, observacoes || null)
      .query(`
        UPDATE dbo.lote
        SET
          data_coleta = @data_coleta,
          agencia_id = @agencia_id,
          tecnico_id = @tecnico_id,
          status = @status,
          observacoes = @observacoes,
          atualizado_em = SYSDATETIME()
        OUTPUT
          INSERTED.id,
          INSERTED.data_coleta,
          INSERTED.agencia_id,
          INSERTED.tecnico_id,
          INSERTED.status,
          INSERTED.observacoes,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        WHERE id = @id
      `);

    return res.json({
      message: 'Lote atualizado com sucesso.',
      lote: result.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar lote.',
      error: error.message
    });
  }
}

async function atualizarStatusLote(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: 'O campo status é obrigatório.'
      });
    }

    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({
        message: 'Status inválido.'
      });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .input('status', sql.NVarChar, status)
      .query(`
        UPDATE dbo.lote
        SET
          status = @status,
          atualizado_em = SYSDATETIME()
        OUTPUT
          INSERTED.id,
          INSERTED.data_coleta,
          INSERTED.agencia_id,
          INSERTED.tecnico_id,
          INSERTED.status,
          INSERTED.observacoes,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        WHERE id = @id
      `);

    const lote = result.recordset[0];

    if (!lote) {
      return res.status(404).json({ message: 'Lote não encontrado.' });
    }

    return res.json({
      message: 'Status do lote atualizado com sucesso.',
      lote
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar status do lote.',
      error: error.message
    });
  }
}

module.exports = {
  listarLotes,
  buscarLotePorId,
  criarLote,
  atualizarLote,
  atualizarStatusLote
};