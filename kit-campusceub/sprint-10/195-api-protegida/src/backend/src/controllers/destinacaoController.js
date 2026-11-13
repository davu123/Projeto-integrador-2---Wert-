const { getConnection, sql } = require('../config/database');

const TIPOS_VALIDOS = ['reciclagem', 'reuso', 'destruicao'];
const CAMPOS = 'id, equipamento_id, tipo_destino, empresa, data, certificado_url, criado_em, atualizado_em';
const CAMPOS_INSERIDOS = CAMPOS.split(', ').map((campo) => `INSERTED.${campo}`).join(', ');

function idValido(id) {
  return (typeof id === 'number' || (typeof id === 'string' && /^\d+$/.test(id)))
    && Number.isInteger(Number(id)) && Number(id) > 0 && Number(id) <= 2147483647;
}

function validarDados(dados) {
  if (!idValido(dados.equipamento_id)) {
    return 'equipamento_id deve ser um inteiro positivo válido.';
  }

  if (!TIPOS_VALIDOS.includes(dados.tipo_destino)) {
  return 'tipo_destino deve ser reciclagem, reuso ou destruicao.';
}

  if (typeof dados.empresa !== 'string' || !dados.empresa.trim() || dados.empresa.trim().length > 150) {
    return 'empresa é obrigatória e deve ter até 150 caracteres.';
  }

  if (typeof dados.data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dados.data) || dados.data.startsWith('0000')) {
    return 'data deve ser uma data válida no formato AAAA-MM-DD.';
  }

  const data = new Date(`${dados.data}T00:00:00.000Z`);
  if (Number.isNaN(data.getTime()) || data.toISOString().slice(0, 10) !== dados.data) {
    return 'data deve ser uma data válida no formato AAAA-MM-DD.';
  }

  if (dados.certificado_url != null
    && (typeof dados.certificado_url !== 'string' || dados.certificado_url.trim().length > 2048)) {
    return 'certificado_url deve ser um texto de até 2048 caracteres ou vazio.';
  }

  return null;
}

function preencherDados(request, dados) {
  return request
    .input('equipamento_id', sql.Int, Number(dados.equipamento_id))
    .input('tipo_destino', sql.NVarChar(30), dados.tipo_destino)
    .input('empresa', sql.NVarChar(150), dados.empresa.trim())
    .input('data', sql.Date, new Date(`${dados.data}T00:00:00.000Z`))
    .input('certificado_url', sql.NVarChar(2048), dados.certificado_url?.trim() || null);
}

async function equipamentoExiste(pool, equipamentoId) {
  const result = await pool.request()
    .input('equipamento_id', sql.Int, Number(equipamentoId))
    .query('SELECT id FROM dbo.equipamento WHERE id = @equipamento_id');

  return Boolean(result.recordset[0]);
}

function responderErro(res, error, message) {
  if (error.number === 2601 || error.number === 2627) {
    return res.status(409).json({ message: 'Já existe uma destinação para este equipamento.' });
  }

  // A FK também protege contra a exclusão do equipamento entre a consulta e a gravação.
  if (error.number === 547) {
    return res.status(409).json({ message: 'O vínculo com o equipamento não está mais disponível.' });
  }

  console.error('[destinacoes]', error);
  return res.status(500).json({ message });
}

async function listarDestinacoes(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT ${CAMPOS} FROM dbo.destinacao ORDER BY id DESC`);
    return res.json(result.recordset);
  } catch (error) {
    return responderErro(res, error, 'Erro ao listar destinações.');
  }
}

async function buscarDestinacaoPorId(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ message: 'id deve ser um inteiro positivo válido.' });
  }

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, Number(req.params.id))
      .query(`SELECT ${CAMPOS} FROM dbo.destinacao WHERE id = @id`);

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    return res.json(result.recordset[0]);
  } catch (error) {
    return responderErro(res, error, 'Erro ao buscar destinação.');
  }
}

async function criarDestinacao(req, res) {
  const dados = req.body || {};
  const erro = validarDados(dados);
  if (erro) return res.status(400).json({ message: erro });

  try {
    const pool = await getConnection();

    if (!await equipamentoExiste(pool, dados.equipamento_id)) {
      return res.status(404).json({ message: 'Equipamento não encontrado.' });
    }

    const result = await preencherDados(pool.request(), dados).query(`
      INSERT INTO dbo.destinacao (equipamento_id, tipo_destino, empresa, data, certificado_url)
      OUTPUT ${CAMPOS_INSERIDOS}
      VALUES (@equipamento_id, @tipo_destino, @empresa, @data, @certificado_url)
    `);

    return res.status(201).json({
      message: 'Destinação criada com sucesso.',
      destinacao: result.recordset[0]
    });
  } catch (error) {
    return responderErro(res, error, 'Erro ao criar destinação.');
  }
}

async function atualizarDestinacao(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ message: 'id deve ser um inteiro positivo válido.' });
  }

  const dados = req.body || {};
  const erro = validarDados(dados);
  if (erro) return res.status(400).json({ message: erro });

  try {
    const pool = await getConnection();
    const existente = await pool.request()
      .input('id', sql.Int, Number(req.params.id))
      .query('SELECT id FROM dbo.destinacao WHERE id = @id');

    if (!existente.recordset[0]) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    if (!await equipamentoExiste(pool, dados.equipamento_id)) {
      return res.status(404).json({ message: 'Equipamento não encontrado.' });
    }

    const result = await preencherDados(pool.request(), dados)
      .input('id', sql.Int, Number(req.params.id))
      .query(`
        UPDATE dbo.destinacao
        SET equipamento_id = @equipamento_id,
            tipo_destino = @tipo_destino,
            empresa = @empresa,
            data = @data,
            certificado_url = @certificado_url,
            atualizado_em = SYSDATETIME()
        OUTPUT ${CAMPOS_INSERIDOS}
        WHERE id = @id
      `);

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    return res.json({
      message: 'Destinação atualizada com sucesso.',
      destinacao: result.recordset[0]
    });
  } catch (error) {
    return responderErro(res, error, 'Erro ao atualizar destinação.');
  }
}

async function excluirDestinacao(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ message: 'id deve ser um inteiro positivo válido.' });
  }

  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, Number(req.params.id))
      .query('DELETE FROM dbo.destinacao OUTPUT DELETED.id WHERE id = @id');

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Destinação não encontrada.' });
    }

    return res.json({ message: 'Destinação excluída com sucesso.' });
  } catch (error) {
    return responderErro(res, error, 'Erro ao excluir destinação.');
  }
}

module.exports = {
  listarDestinacoes,
  buscarDestinacaoPorId,
  criarDestinacao,
  atualizarDestinacao,
  excluirDestinacao
};
