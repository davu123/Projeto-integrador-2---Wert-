const { getConnection, sql } = require('../config/database');

const TIPOS_VALIDOS = ['reciclagem', 'reuso', 'destruicao'];

async function listarDestinacoes(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT
        d.id,
        d.equipamento_id,
        e.tipo AS equipamento_tipo,
        e.marca AS equipamento_marca,
        e.modelo AS equipamento_modelo,
        d.tipo_destino,
        d.empresa,
        d.data,
        d.certificado_url,
        d.criado_em,
        d.atualizado_em
      FROM dbo.destinacao d
      INNER JOIN dbo.equipamento e ON e.id = d.equipamento_id
      ORDER BY d.id DESC
    `);

    return res.json(result.recordset);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar destinações.',
      error: error.message
    });
  }
}

async function buscarDestinacaoPorId(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT
          d.id,
          d.equipamento_id,
          e.tipo AS equipamento_tipo,
          e.marca AS equipamento_marca,
          e.modelo AS equipamento_modelo,
          d.tipo_destino,
          d.empresa,
          d.data,
          d.certificado_url,
          d.criado_em,
          d.atualizado_em
        FROM dbo.destinacao d
        INNER JOIN dbo.equipamento e ON e.id = d.equipamento_id
        WHERE d.id = @id
      `);

    const destinacao = result.recordset[0];

    if (!destinacao) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    return res.json(destinacao);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar destinação.',
      error: error.message
    });
  }
}

async function criarDestinacao(req, res) {
  try {
    const { equipamento_id, tipo_destino, empresa, data, certificado_url } = req.body;

    if (!equipamento_id || !tipo_destino || !empresa || !data) {
      return res.status(400).json({
        message: 'equipamento_id, tipo_destino, empresa e data são obrigatórios.'
      });
    }

    if (!TIPOS_VALIDOS.includes(tipo_destino)) {
      return res.status(400).json({
        message: 'Tipo de destinação inválido.'
      });
    }

    const pool = await getConnection();

    const equipamentoExiste = await pool
      .request()
      .input('equipamento_id', sql.Int, Number(equipamento_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.equipamento
        WHERE id = @equipamento_id
      `);

    if (!equipamentoExiste.recordset[0]) {
      return res.status(404).json({ message: 'Equipamento não encontrado.' });
    }

    const destinacaoExiste = await pool
      .request()
      .input('equipamento_id', sql.Int, Number(equipamento_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.destinacao
        WHERE equipamento_id = @equipamento_id
      `);

    if (destinacaoExiste.recordset[0]) {
      return res.status(409).json({
        message: 'Este equipamento já possui destinação cadastrada.'
      });
    }

    const result = await pool
      .request()
      .input('equipamento_id', sql.Int, Number(equipamento_id))
      .input('tipo_destino', sql.NVarChar, tipo_destino)
      .input('empresa', sql.NVarChar, empresa)
      .input('data', sql.Date, data)
      .input('certificado_url', sql.NVarChar, certificado_url || null)
      .query(`
        INSERT INTO dbo.destinacao (
          equipamento_id,
          tipo_destino,
          empresa,
          data,
          certificado_url
        )
        OUTPUT
          INSERTED.id,
          INSERTED.equipamento_id,
          INSERTED.tipo_destino,
          INSERTED.empresa,
          INSERTED.data,
          INSERTED.certificado_url,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        VALUES (
          @equipamento_id,
          @tipo_destino,
          @empresa,
          @data,
          @certificado_url
        )
      `);

    return res.status(201).json({
      message: 'Destinação criada com sucesso.',
      destinacao: result.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar destinação.',
      error: error.message
    });
  }
}

async function atualizarDestinacao(req, res) {
  try {
    const { id } = req.params;
    const { equipamento_id, tipo_destino, empresa, data, certificado_url } = req.body;

    if (!equipamento_id || !tipo_destino || !empresa || !data) {
      return res.status(400).json({
        message: 'equipamento_id, tipo_destino, empresa e data são obrigatórios.'
      });
    }

    if (!TIPOS_VALIDOS.includes(tipo_destino)) {
      return res.status(400).json({
        message: 'Tipo de destinação inválido.'
      });
    }

    const pool = await getConnection();

    const destinacaoExiste = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.destinacao
        WHERE id = @id
      `);

    if (!destinacaoExiste.recordset[0]) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    const equipamentoExiste = await pool
      .request()
      .input('equipamento_id', sql.Int, Number(equipamento_id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.equipamento
        WHERE id = @equipamento_id
      `);

    if (!equipamentoExiste.recordset[0]) {
      return res.status(404).json({ message: 'Equipamento não encontrado.' });
    }

    const equipamentoEmUso = await pool
      .request()
      .input('equipamento_id', sql.Int, Number(equipamento_id))
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.destinacao
        WHERE equipamento_id = @equipamento_id
          AND id <> @id
      `);

    if (equipamentoEmUso.recordset[0]) {
      return res.status(409).json({
        message: 'Outro registro de destinação já usa este equipamento.'
      });
    }

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .input('equipamento_id', sql.Int, Number(equipamento_id))
      .input('tipo_destino', sql.NVarChar, tipo_destino)
      .input('empresa', sql.NVarChar, empresa)
      .input('data', sql.Date, data)
      .input('certificado_url', sql.NVarChar, certificado_url || null)
      .query(`
        UPDATE dbo.destinacao
        SET
          equipamento_id = @equipamento_id,
          tipo_destino = @tipo_destino,
          empresa = @empresa,
          data = @data,
          certificado_url = @certificado_url,
          atualizado_em = SYSDATETIME()
        OUTPUT
          INSERTED.id,
          INSERTED.equipamento_id,
          INSERTED.tipo_destino,
          INSERTED.empresa,
          INSERTED.data,
          INSERTED.certificado_url,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        WHERE id = @id
      `);

    return res.json({
      message: 'Destinação atualizada com sucesso.',
      destinacao: result.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar destinação.',
      error: error.message
    });
  }
}

async function excluirDestinacao(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const destinacaoExiste = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.destinacao
        WHERE id = @id
      `);

    if (!destinacaoExiste.recordset[0]) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        DELETE FROM dbo.destinacao
        WHERE id = @id
      `);

    return res.json({
      message: 'Destinação excluída com sucesso.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao excluir destinação.',
      error: error.message
    });
  }
}

module.exports = {
  listarDestinacoes,
  buscarDestinacaoPorId,
  criarDestinacao,
  atualizarDestinacao,
  excluirDestinacao
};
