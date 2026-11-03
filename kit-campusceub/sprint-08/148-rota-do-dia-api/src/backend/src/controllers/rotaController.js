const { getConnection, sql } = require('../config/database');

function inteiroPositivo(valor) {
  if (typeof valor !== 'number' && !(typeof valor === 'string' && /^\d+$/.test(valor))) {
    return NaN;
  }

  const numero = Number(valor);
  return Number.isInteger(numero) && numero > 0 && numero <= 2147483647 ? numero : NaN;
}

function dataValida(data) {
  if (typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data) || data.startsWith('0000')) {
    return false;
  }
  const dia = new Date(data + 'T00:00:00Z');
  return !Number.isNaN(dia.getTime()) && dia.toISOString().slice(0, 10) === data;
}

function normalizarParadas(paradas) {
  if (!Array.isArray(paradas) || !paradas.length) return null;

  const resultado = [];
  const ordens = new Set();
  for (const [indice, parada] of paradas.entries()) {
    if (!parada || typeof parada !== 'object') return null;
    const agencia = parada.agencia_id == null ? null : inteiroPositivo(parada.agencia_id);
    const lote = parada.lote_id == null ? null : inteiroPositivo(parada.lote_id);
    const ordem = inteiroPositivo(parada.ordem ?? indice + 1);
    if ((agencia === null && lote === null) || Number.isNaN(agencia) || Number.isNaN(lote)
      || Number.isNaN(ordem) || ordens.has(ordem)) return null;

    ordens.add(ordem);
    resultado.push({ agencia_id: agencia, lote_id: lote, ordem });
  }
  return resultado;
}

async function carregarRotas(conexao, id = null) {
  const result = await conexao.request().input('id', sql.Int, id).query(`
    SELECT r.id, r.data, r.motorista_id, u.nome AS motorista_nome, r.criado_em, r.atualizado_em,
      (SELECT p.id, p.rota_id, p.agencia_id, a.nome AS agencia_nome, p.lote_id, p.ordem
       FROM dbo.parada p
       LEFT JOIN dbo.agencia a ON a.id = p.agencia_id
       WHERE p.rota_id = r.id
       ORDER BY p.ordem FOR JSON PATH, INCLUDE_NULL_VALUES) AS paradas
    FROM dbo.rota r
    LEFT JOIN dbo.usuario u ON u.id = r.motorista_id
    WHERE @id IS NULL OR r.id = @id
    ORDER BY r.data DESC, r.id DESC
  `);
  return result.recordset.map((rota) => ({ ...rota, paradas: JSON.parse(rota.paradas) }));
}

async function listarRotas(req, res) {
  try {
    const rotas = await carregarRotas(await getConnection());
    return res.json(rotas);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao listar rotas.' });
  }
}

async function buscarRotaPorId(req, res) {
  try {
    const [rota] = await carregarRotas(await getConnection(), req.params.id);
    if (!rota) return res.status(404).json({ message: 'Rota não encontrada.' });
    return res.json(rota);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar rota.' });
  }
}

async function salvarRota(req, res) {
  const { data, paradas } = req.body;
  if (!dataValida(data)) {
    return res.status(400).json({ message: 'Informe uma data válida no formato AAAA-MM-DD.' });
  }
  const paradasValidas = normalizarParadas(paradas);
  if (!paradasValidas) {
    return res.status(400).json({
      message: 'Informe ao menos uma parada com agência ou lote. As ordens devem ser inteiras, positivas e únicas.'
    });
  }

  const criando = req.params.id === undefined;
  try {
    const pool = await getConnection();
    const transacao = pool.transaction();
    await transacao.begin();
    try {
      const comando = transacao.request().input('data', sql.Date, data);
      const resultado = criando
        ? await comando.query('INSERT INTO dbo.rota (data) OUTPUT INSERTED.id VALUES (@data)')
        : await comando.input('id', sql.Int, req.params.id).query(`
            UPDATE dbo.rota SET data = @data, atualizado_em = SYSDATETIME()
            OUTPUT INSERTED.id WHERE id = @id
          `);
      const registro = resultado.recordset[0];
      if (!registro) {
        await transacao.rollback();
        return res.status(404).json({ message: 'Rota não encontrada.' });
      }
      const insercao = await transacao.request()
        .input('id', sql.Int, registro.id)
        .input('paradas', sql.NVarChar(sql.MAX), JSON.stringify(paradasValidas))
        .query(`
          DELETE FROM dbo.parada WHERE rota_id = @id;
          INSERT INTO dbo.parada (rota_id, agencia_id, lote_id, ordem)
          SELECT @id, p.agencia_id, p.lote_id, p.ordem
          FROM OPENJSON(@paradas) WITH (agencia_id INT, lote_id INT, ordem INT) AS p
          LEFT JOIN dbo.agencia a ON a.id = p.agencia_id
          LEFT JOIN dbo.lote l ON l.id = p.lote_id
          WHERE (p.agencia_id IS NULL OR a.id IS NOT NULL)
            AND (p.lote_id IS NULL OR l.id IS NOT NULL);
          SELECT @@ROWCOUNT AS total;
        `);
      if (insercao.recordset[0].total !== paradasValidas.length) {
        await transacao.rollback();
        return res.status(400).json({ message: 'Agência ou lote não encontrado.' });
      }
      const [rota] = await carregarRotas(transacao, registro.id);
      await transacao.commit();
      return res.status(criando ? 201 : 200).json({
        message: criando ? 'Rota criada com sucesso.' : 'Rota atualizada com sucesso.', rota
      });
    } catch (error) {
      await transacao.rollback();
      throw error;
    }
  } catch (error) {
    if (error.number === 547) {
      return res.status(400).json({ message: 'Agência ou lote não encontrado.' });
    }
    return res.status(500).json({ message: 'Erro ao salvar rota.' });
  }
}

async function excluirRota(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().input('id', sql.Int, req.params.id)
      .query('DELETE FROM dbo.rota WHERE id = @id');
    if (!result.rowsAffected[0]) return res.status(404).json({ message: 'Rota não encontrada.' });
    return res.json({ message: 'Rota excluída com sucesso.' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao excluir rota.' });
  }
}

async function atribuirMotorista(req, res) {
  const { motorista_id: valor } = req.body;
  const motoristaId = valor === null ? null : inteiroPositivo(valor);
  if (Number.isNaN(motoristaId)) {
    return res.status(400).json({ message: 'Informe o ID de um motorista ou null para remover a atribuição.' });
  }

  try {
    const pool = await getConnection();
    const transacao = pool.transaction();
    await transacao.begin();
    try {
      const existente = await transacao.request().input('id', sql.Int, req.params.id)
        .query('SELECT id FROM dbo.rota WITH (UPDLOCK, HOLDLOCK) WHERE id = @id');
      if (!existente.recordset[0]) {
        await transacao.rollback();
        return res.status(404).json({ message: 'Rota não encontrada.' });
      }

      if (motoristaId !== null) {
        const usuario = await transacao.request().input('id', sql.Int, motoristaId)
          .query(`
            SELECT id FROM dbo.usuario WITH (HOLDLOCK)
            WHERE id = @id AND perfil = 'motorista' AND ativo = 1
          `);
        if (!usuario.recordset[0]) {
          await transacao.rollback();
          return res.status(400).json({ message: 'Informe um usuário ativo com perfil motorista.' });
        }
      }

      await transacao.request()
        .input('id', sql.Int, req.params.id)
        .input('motorista_id', sql.Int, motoristaId)
        .query(`
          UPDATE dbo.rota SET motorista_id = @motorista_id, atualizado_em = SYSDATETIME()
          WHERE id = @id
        `);
      const [rota] = await carregarRotas(transacao, req.params.id);
      await transacao.commit();
      return res.json({
        message: motoristaId === null ? 'Motorista removido da rota.' : 'Motorista atribuído à rota.', rota
      });
    } catch (error) {
      await transacao.rollback();
      throw error;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atribuir motorista.' });
  }
}

function dataDeHoje() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
}

async function listarMinhasRotas(req, res) {
  const data = req.query.data === undefined ? dataDeHoje() : req.query.data;
  if (!dataValida(data)) {
    return res.status(400).json({ message: 'Informe uma data válida no formato AAAA-MM-DD.' });
  }

  try {
    const pool = await getConnection();
    const encontradas = await pool.request()
      .input('motorista_id', sql.Int, req.usuario.id)
      .input('data', sql.Date, data)
      .query('SELECT id FROM dbo.rota WHERE motorista_id = @motorista_id AND data = @data ORDER BY id');

    const rotas = [];
    for (const { id } of encontradas.recordset) {
      const [rota] = await carregarRotas(pool, id);
      if (rota) rotas.push(rota);
    }
    return res.json(rotas);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar a rota do dia.' });
  }
}

module.exports = {
  listarRotas, buscarRotaPorId, salvarRota, excluirRota, atribuirMotorista, listarMinhasRotas
};
