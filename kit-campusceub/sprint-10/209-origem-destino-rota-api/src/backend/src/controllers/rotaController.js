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

// Origem e destino da rota: ID de um ponto de entrega ativo, ou null para nenhum.
// undefined (campo ausente) mantém o valor salvo na edição.
function lerPontoEntrega(valor) {
  if (valor === undefined) return undefined;
  if (valor === null || valor === '') return null;
  return inteiroPositivo(valor);
}

async function carregarRotas(conexao, id = null, { motoristaId = null, data = null } = {}) {
  const result = await conexao.request()
    .input('id', sql.Int, id)
    .input('motorista_id', sql.Int, motoristaId)
    .input('data', sql.Date, data)
    .query(`
    SELECT r.id, r.data, r.motorista_id, u.nome AS motorista_nome, r.origem_id, r.destino_id,
      r.criado_em, r.atualizado_em,
      (SELECT pe.id, pe.nome, pe.tipo, pe.endereco, pe.cidade, pe.uf, pe.latitude, pe.longitude
       FROM dbo.ponto_entrega pe WHERE pe.id = r.origem_id
       FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES) AS origem,
      (SELECT pe.id, pe.nome, pe.tipo, pe.endereco, pe.cidade, pe.uf, pe.latitude, pe.longitude
       FROM dbo.ponto_entrega pe WHERE pe.id = r.destino_id
       FOR JSON PATH, WITHOUT_ARRAY_WRAPPER, INCLUDE_NULL_VALUES) AS destino,
      (SELECT p.id, p.rota_id, p.agencia_id, a.nome AS agencia_nome, p.lote_id, p.ordem,
         a.endereco, a.cidade, a.uf, a.latitude, a.longitude,
         p.status_recolhimento, p.status_atualizado_em
       FROM dbo.parada p
       LEFT JOIN dbo.lote l ON l.id = p.lote_id
       -- Parada só com lote: endereço e coordenadas vêm da agência do lote.
       LEFT JOIN dbo.agencia a ON a.id = COALESCE(p.agencia_id, l.agencia_id)
       WHERE p.rota_id = r.id
       ORDER BY p.ordem FOR JSON PATH, INCLUDE_NULL_VALUES) AS paradas
    FROM dbo.rota r
    LEFT JOIN dbo.usuario u ON u.id = r.motorista_id
    WHERE (@id IS NULL OR r.id = @id)
      AND (@motorista_id IS NULL OR r.motorista_id = @motorista_id)
      AND (@data IS NULL OR r.data = @data)
    ORDER BY r.data DESC, r.id DESC
  `);
  return result.recordset.map((rota) => ({
    ...rota,
    origem: rota.origem ? JSON.parse(rota.origem) : null,
    destino: rota.destino ? JSON.parse(rota.destino) : null,
    paradas: JSON.parse(rota.paradas)
  }));
}

const ROTA_COMECADA = 'A rota já tem recolhimento marcado pelo motorista e não pode ser alterada nem excluída.';

// Trava a rota até o fim da transação e conta as paradas com recolhimento marcado.
async function contarParadasMarcadas(transacao, rotaId) {
  const resultado = await transacao.request().input('id', sql.Int, rotaId).query(`
    SELECT id FROM dbo.rota WITH (UPDLOCK, HOLDLOCK) WHERE id = @id;
    SELECT COUNT(*) AS marcadas FROM dbo.parada
    WHERE rota_id = @id AND status_recolhimento IS NOT NULL;
  `);
  return resultado.recordsets[1][0].marcadas;
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
  const origem = lerPontoEntrega(req.body.origem_id);
  const destino = lerPontoEntrega(req.body.destino_id);
  if (Number.isNaN(origem) || Number.isNaN(destino)) {
    return res.status(400).json({ message: 'Informe em origem_id e destino_id o ID de um ponto de entrega, ou null.' });
  }

  const criando = req.params.id === undefined;
  try {
    const pool = await getConnection();
    const transacao = pool.transaction();
    await transacao.begin();
    try {
      if (!criando && await contarParadasMarcadas(transacao, req.params.id) > 0) {
        await transacao.rollback();
        return res.status(409).json({ message: ROTA_COMECADA });
      }

      const pontos = new Set([origem, destino].filter((id) => id));
      if (pontos.size) {
        const ativos = await transacao.request()
          .input('origem', sql.Int, origem || null)
          .input('destino', sql.Int, destino || null)
          .query(`
            SELECT COUNT(*) AS total FROM dbo.ponto_entrega WITH (HOLDLOCK)
            WHERE ativo = 1 AND id IN (@origem, @destino)
          `);
        if (ativos.recordset[0].total !== pontos.size) {
          await transacao.rollback();
          return res.status(400).json({ message: 'Ponto de entrega de origem ou destino não encontrado ou inativo.' });
        }
      }

      const comando = transacao.request()
        .input('data', sql.Date, data)
        .input('origem', sql.Int, origem ?? null)
        .input('destino', sql.Int, destino ?? null)
        .input('origem_enviada', sql.Bit, origem !== undefined)
        .input('destino_enviado', sql.Bit, destino !== undefined);
      const resultado = criando
        ? await comando.query(`
            INSERT INTO dbo.rota (data, origem_id, destino_id) OUTPUT INSERTED.id
            VALUES (@data, @origem, @destino)
          `)
        : await comando.input('id', sql.Int, req.params.id).query(`
            UPDATE dbo.rota SET data = @data,
              origem_id = CASE WHEN @origem_enviada = 1 THEN @origem ELSE origem_id END,
              destino_id = CASE WHEN @destino_enviado = 1 THEN @destino ELSE destino_id END,
              atualizado_em = SYSDATETIME()
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
    const transacao = pool.transaction();
    await transacao.begin();
    try {
      if (await contarParadasMarcadas(transacao, req.params.id) > 0) {
        await transacao.rollback();
        return res.status(409).json({ message: ROTA_COMECADA });
      }
      const result = await transacao.request().input('id', sql.Int, req.params.id)
        .query('DELETE FROM dbo.rota WHERE id = @id');
      if (!result.rowsAffected[0]) {
        await transacao.rollback();
        return res.status(404).json({ message: 'Rota não encontrada.' });
      }
      await transacao.commit();
      return res.json({ message: 'Rota excluída com sucesso.' });
    } catch (error) {
      await transacao.rollback();
      throw error;
    }
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

      if (await contarParadasMarcadas(transacao, req.params.id) > 0) {
        await transacao.rollback();
        return res.status(409).json({ message: ROTA_COMECADA });
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
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const valores = Object.fromEntries(partes.map(({ type, value }) => [type, value]));
  return `${valores.year}-${valores.month}-${valores.day}`;
}

async function listarMinhasRotas(req, res) {
  const data = req.query.data === undefined ? dataDeHoje() : req.query.data;
  if (!dataValida(data)) {
    return res.status(400).json({ message: 'Informe uma data válida no formato AAAA-MM-DD.' });
  }
  const motoristaId = inteiroPositivo(req.usuario.id);
  if (Number.isNaN(motoristaId)) {
    return res.status(401).json({ message: 'Usuário não identificado.' });
  }

  try {
    const rotas = await carregarRotas(await getConnection(), null, { motoristaId, data });
    return res.json(rotas);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar a rota do dia.' });
  }
}

const STATUS_RECOLHIMENTO = ['recolhido', 'nao_recolhido', 'parcial'];

async function registrarRecolhimento(req, res) {
  const paradaId = inteiroPositivo(req.params.paradaId);
  if (Number.isNaN(paradaId)) {
    return res.status(400).json({ message: 'ID da parada inválido.' });
  }
  const { status_recolhimento: status } = req.body;
  if (!STATUS_RECOLHIMENTO.includes(status)) {
    return res.status(400).json({ message: 'Informe o status: recolhido, nao_recolhido ou parcial.' });
  }

  const motoristaId = inteiroPositivo(req.usuario.id);
  if (Number.isNaN(motoristaId)) {
    return res.status(401).json({ message: 'Usuário não identificado.' });
  }

  try {
    const pool = await getConnection();
    const transacao = pool.transaction();
    await transacao.begin();
    try {
      const parada = await transacao.request().input('id', sql.Int, paradaId)
        .query('SELECT rota_id FROM dbo.parada WHERE id = @id');
      const rotaId = parada.recordset[0]?.rota_id;
      if (rotaId === undefined) {
        await transacao.rollback();
        return res.status(404).json({ message: 'Parada não encontrada.' });
      }

      const dona = await transacao.request().input('id', sql.Int, rotaId)
        .query('SELECT motorista_id FROM dbo.rota WITH (UPDLOCK, HOLDLOCK) WHERE id = @id');
      const rota = dona.recordset[0];
      if (!rota) {
        await transacao.rollback();
        return res.status(404).json({ message: 'Parada não encontrada.' });
      }
      if (rota.motorista_id !== motoristaId) {
        await transacao.rollback();
        return res.status(403).json({ message: 'Esta parada não é de uma rota atribuída a você.' });
      }

      const atualizada = await transacao.request()
        .input('id', sql.Int, paradaId)
        .input('rota_id', sql.Int, rotaId)
        .input('status', sql.NVarChar(20), status)
        .query(`
          UPDATE dbo.parada SET status_recolhimento = @status, status_atualizado_em = SYSDATETIME()
          OUTPUT INSERTED.id WHERE id = @id AND rota_id = @rota_id
        `);
      if (!atualizada.recordset[0]) {
        await transacao.rollback();
        return res.status(404).json({ message: 'Parada não encontrada.' });
      }

      const [rotaAtualizada] = await carregarRotas(transacao, rotaId);
      await transacao.commit();
      return res.json({ message: 'Recolhimento registrado.', rota: rotaAtualizada });
    } catch (error) {
      await transacao.rollback();
      throw error;
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar recolhimento.' });
  }
}

module.exports = {
  listarRotas, buscarRotaPorId, salvarRota, excluirRota, atribuirMotorista, listarMinhasRotas,
  registrarRecolhimento
};
