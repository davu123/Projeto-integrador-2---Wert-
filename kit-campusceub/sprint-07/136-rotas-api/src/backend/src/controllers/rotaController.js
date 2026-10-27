const { getConnection, sql } = require('../config/database');

function normalizarParadas(paradas) {
  if (!Array.isArray(paradas)) {
    return [];
  }

  return paradas.map((parada, index) => ({
    agencia_id: parada.agencia_id ? Number(parada.agencia_id) : null,
    lote_id: parada.lote_id ? Number(parada.lote_id) : null,
    ordem: parada.ordem ? Number(parada.ordem) : index + 1
  }));
}

async function validarParadas(pool, paradas) {
  if (paradas.length === 0) {
    return 'A rota precisa de pelo menos uma parada.';
  }

  const ordens = paradas.map((parada) => parada.ordem);
  if (ordens.some((ordem) => !Number.isInteger(ordem) || ordem < 1)) {
    return 'Cada parada precisa de uma ordem inteira a partir de 1.';
  }

  if (new Set(ordens).size !== ordens.length) {
    return 'A ordem das paradas não pode se repetir.';
  }

  for (const parada of paradas) {
    if (!parada.agencia_id && !parada.lote_id) {
      return 'Cada parada precisa de agência ou lote.';
    }

    if (parada.agencia_id) {
      const agencia = await pool
        .request()
        .input('id', sql.Int, parada.agencia_id)
        .query('SELECT TOP 1 id FROM dbo.agencia WHERE id = @id');

      if (!agencia.recordset[0]) {
        return 'Agência não encontrada.';
      }
    }

    if (parada.lote_id) {
      const lote = await pool
        .request()
        .input('id', sql.Int, parada.lote_id)
        .query('SELECT TOP 1 id FROM dbo.lote WHERE id = @id');

      if (!lote.recordset[0]) {
        return 'Lote não encontrado.';
      }
    }
  }

  return null;
}

async function gravarParadas(transaction, rotaId, paradas) {
  await new sql.Request(transaction)
    .input('rota_id', sql.Int, rotaId)
    .query('DELETE FROM dbo.parada WHERE rota_id = @rota_id');

  for (const parada of paradas) {
    await new sql.Request(transaction)
      .input('rota_id', sql.Int, rotaId)
      .input('agencia_id', sql.Int, parada.agencia_id)
      .input('lote_id', sql.Int, parada.lote_id)
      .input('ordem', sql.Int, parada.ordem)
      .query(`
        INSERT INTO dbo.parada (rota_id, agencia_id, lote_id, ordem)
        VALUES (@rota_id, @agencia_id, @lote_id, @ordem)
      `);
  }
}

async function carregarParadas(pool, rotaId) {
  const result = await pool
    .request()
    .input('rota_id', sql.Int, rotaId)
    .query(`
      SELECT
        p.id,
        p.rota_id,
        p.agencia_id,
        a.nome AS agencia_nome,
        p.lote_id,
        p.ordem
      FROM dbo.parada p
      LEFT JOIN dbo.agencia a ON a.id = p.agencia_id
      WHERE p.rota_id = @rota_id
      ORDER BY p.ordem
    `);

  return result.recordset;
}

async function carregarRota(pool, rotaId) {
  const result = await pool
    .request()
    .input('id', sql.Int, rotaId)
    .query(`
      SELECT
        r.id,
        r.data,
        r.motorista_id,
        u.nome AS motorista_nome,
        r.criado_em,
        r.atualizado_em
      FROM dbo.rota r
      LEFT JOIN dbo.usuario u ON u.id = r.motorista_id
      WHERE r.id = @id
    `);

  const rota = result.recordset[0];
  if (!rota) {
    return null;
  }

  rota.paradas = await carregarParadas(pool, rota.id);
  return rota;
}

async function listarRotas(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
        r.id,
        r.data,
        r.motorista_id,
        u.nome AS motorista_nome,
        r.criado_em,
        r.atualizado_em
      FROM dbo.rota r
      LEFT JOIN dbo.usuario u ON u.id = r.motorista_id
      ORDER BY r.data DESC, r.id DESC
    `);

    const rotas = [];
    for (const rota of result.recordset) {
      rotas.push({
        ...rota,
        paradas: await carregarParadas(pool, rota.id)
      });
    }

    return res.json(rotas);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar rotas.',
      error: error.message
    });
  }
}

async function buscarRotaPorId(req, res) {
  try {
    const pool = await getConnection();
    const rota = await carregarRota(pool, Number(req.params.id));

    if (!rota) {
      return res.status(404).json({ message: 'Rota não encontrada.' });
    }

    return res.json(rota);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar rota.',
      error: error.message
    });
  }
}

async function criarRota(req, res) {
  try {
    const { data } = req.body;
    const paradas = normalizarParadas(req.body.paradas);

    if (!data) {
      return res.status(400).json({ message: 'data é obrigatória.' });
    }

    const pool = await getConnection();
    const erroParadas = await validarParadas(pool, paradas);
    if (erroParadas) {
      return res.status(400).json({ message: erroParadas });
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      const inserida = await new sql.Request(transaction)
        .input('data', sql.Date, data)
        .query(`
          INSERT INTO dbo.rota (data)
          OUTPUT INSERTED.id
          VALUES (@data)
        `);

      const rotaId = inserida.recordset[0].id;
      await gravarParadas(transaction, rotaId, paradas);
      await transaction.commit();

      const rota = await carregarRota(pool, rotaId);
      return res.status(201).json({
        message: 'Rota criada com sucesso.',
        rota
      });
    } catch (error) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        return res.status(500).json({
          message: 'Erro ao criar rota.',
          error: error.message
        });
      }

      return res.status(500).json({
        message: 'Erro ao criar rota.',
        error: error.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar rota.',
      error: error.message
    });
  }
}

async function atualizarRota(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const paradas = normalizarParadas(req.body.paradas);

    if (!data) {
      return res.status(400).json({ message: 'data é obrigatória.' });
    }

    const pool = await getConnection();
    const existente = await carregarRota(pool, Number(id));
    if (!existente) {
      return res.status(404).json({ message: 'Rota não encontrada.' });
    }

    const erroParadas = await validarParadas(pool, paradas);
    if (erroParadas) {
      return res.status(400).json({ message: erroParadas });
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      await new sql.Request(transaction)
        .input('id', sql.Int, Number(id))
        .input('data', sql.Date, data)
        .query(`
          UPDATE dbo.rota
          SET data = @data, atualizado_em = SYSDATETIME()
          WHERE id = @id
        `);

      await gravarParadas(transaction, Number(id), paradas);
      await transaction.commit();

      const rota = await carregarRota(pool, Number(id));
      return res.json({
        message: 'Rota atualizada com sucesso.',
        rota
      });
    } catch (error) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        return res.status(500).json({
          message: 'Erro ao atualizar rota.',
          error: error.message
        });
      }

      return res.status(500).json({
        message: 'Erro ao atualizar rota.',
        error: error.message
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar rota.',
      error: error.message
    });
  }
}

async function excluirRota(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, Number(req.params.id))
      .query('DELETE FROM dbo.rota WHERE id = @id');

    if (!result.rowsAffected[0]) {
      return res.status(404).json({ message: 'Rota não encontrada.' });
    }

    return res.json({ message: 'Rota excluída com sucesso.' });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao excluir rota.',
      error: error.message
    });
  }
}

module.exports = {
  listarRotas,
  buscarRotaPorId,
  criarRota,
  atualizarRota,
  excluirRota
};
