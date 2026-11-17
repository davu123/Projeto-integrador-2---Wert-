const { getConnection, sql } = require('../config/database');
const { vazio, lerCep, lerEndereco, lerCoordenadas } = require('../utils/localizacao');

const TIPOS = ['deposito', 'destinadora'];

const CAMPOS = `
  id, nome, tipo, cep, endereco, cidade, uf, latitude, longitude, ativo, criado_em, atualizado_em
`;

const CAMPOS_GRAVADOS = `
  INSERTED.id, INSERTED.nome, INSERTED.tipo, INSERTED.cep, INSERTED.endereco, INSERTED.cidade,
  INSERTED.uf, INSERTED.latitude, INSERTED.longitude, INSERTED.ativo, INSERTED.criado_em,
  INSERTED.atualizado_em
`;

function textoObrigatorio(valor, maximo) {
  if (typeof valor !== 'string' || !valor.trim() || valor.trim().length > maximo) return null;
  return valor.trim();
}

// Valida o corpo do POST e do PUT. Todos os campos são obrigatórios, menos o CEP e o ativo.
function lerPontoEntrega(corpo) {
  const nome = textoObrigatorio(corpo.nome, 150);
  if (!nome) return { erro: 'Informe o nome, com até 150 caracteres.' };
  if (!TIPOS.includes(corpo.tipo)) return { erro: 'Informe o tipo: deposito ou destinadora.' };
  const cidade = textoObrigatorio(corpo.cidade, 100);
  if (!cidade) return { erro: 'Informe a cidade, com até 100 caracteres.' };
  if (typeof corpo.uf !== 'string' || !/^[A-Za-z]{2}$/.test(corpo.uf.trim())) {
    return { erro: 'Informe a UF com 2 letras.' };
  }
  if (!vazio(corpo.ativo) && typeof corpo.ativo !== 'boolean') {
    return { erro: 'O campo ativo deve ser true ou false.' };
  }

  const cep = lerCep(corpo.cep);
  if (cep.erro) return { erro: cep.erro };
  const endereco = lerEndereco(corpo.endereco, true);
  if (endereco.erro) return { erro: endereco.erro };
  const coordenadas = lerCoordenadas(corpo.latitude, corpo.longitude, true);
  if (coordenadas.erro) return { erro: coordenadas.erro };

  return {
    nome,
    tipo: corpo.tipo,
    cep: cep.valor,
    endereco: endereco.valor,
    cidade,
    uf: corpo.uf.trim().toUpperCase(),
    latitude: coordenadas.latitude,
    longitude: coordenadas.longitude,
    ativo: typeof corpo.ativo === 'boolean' ? corpo.ativo : null
  };
}

function inputsPonto(request, ponto) {
  return request
    .input('nome', sql.NVarChar(150), ponto.nome)
    .input('tipo', sql.NVarChar(20), ponto.tipo)
    .input('cep', sql.Char(8), ponto.cep)
    .input('endereco', sql.NVarChar(200), ponto.endereco)
    .input('cidade', sql.NVarChar(100), ponto.cidade)
    .input('uf', sql.Char(2), ponto.uf)
    .input('latitude', sql.Decimal(9, 6), ponto.latitude)
    .input('longitude', sql.Decimal(9, 6), ponto.longitude)
    .input('ativo', sql.Bit, ponto.ativo);
}

async function listarPontosEntrega(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT ${CAMPOS} FROM dbo.ponto_entrega ORDER BY ativo DESC, nome
    `);
    return res.json(result.recordset);
  } catch (error) {
    console.error('[pontos-entrega]', error);
    return res.status(500).json({ message: 'Erro ao listar pontos de entrega.' });
  }
}

async function buscarPontoEntregaPorId(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, Number(req.params.id))
      .query(`SELECT ${CAMPOS} FROM dbo.ponto_entrega WHERE id = @id`);
    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Ponto de entrega não encontrado.' });
    }
    return res.json(result.recordset[0]);
  } catch (error) {
    console.error('[pontos-entrega]', error);
    return res.status(500).json({ message: 'Erro ao buscar ponto de entrega.' });
  }
}

async function criarPontoEntrega(req, res) {
  const ponto = lerPontoEntrega(req.body);
  if (ponto.erro) return res.status(400).json({ message: ponto.erro });

  try {
    const pool = await getConnection();
    const result = await inputsPonto(pool.request(), { ...ponto, ativo: ponto.ativo ?? true })
      .query(`
        INSERT INTO dbo.ponto_entrega (nome, tipo, cep, endereco, cidade, uf, latitude, longitude, ativo)
        OUTPUT ${CAMPOS_GRAVADOS}
        VALUES (@nome, @tipo, @cep, @endereco, @cidade, @uf, @latitude, @longitude, @ativo)
      `);
    return res.status(201).json({
      message: 'Ponto de entrega criado com sucesso.',
      ponto_entrega: result.recordset[0]
    });
  } catch (error) {
    console.error('[pontos-entrega]', error);
    return res.status(500).json({ message: 'Erro ao criar ponto de entrega.' });
  }
}

async function atualizarPontoEntrega(req, res) {
  const ponto = lerPontoEntrega(req.body);
  if (ponto.erro) return res.status(400).json({ message: ponto.erro });

  try {
    const pool = await getConnection();
    // Sem o campo ativo no corpo, o ponto continua ativo ou inativo como estava.
    const result = await inputsPonto(pool.request(), ponto)
      .input('id', sql.Int, Number(req.params.id))
      .query(`
        UPDATE dbo.ponto_entrega
        SET nome = @nome, tipo = @tipo, cep = @cep, endereco = @endereco, cidade = @cidade,
          uf = @uf, latitude = @latitude, longitude = @longitude,
          ativo = COALESCE(@ativo, ativo), atualizado_em = SYSDATETIME()
        OUTPUT ${CAMPOS_GRAVADOS}
        WHERE id = @id
      `);
    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Ponto de entrega não encontrado.' });
    }
    return res.json({
      message: 'Ponto de entrega atualizado com sucesso.',
      ponto_entrega: result.recordset[0]
    });
  } catch (error) {
    console.error('[pontos-entrega]', error);
    return res.status(500).json({ message: 'Erro ao atualizar ponto de entrega.' });
  }
}

async function excluirPontoEntrega(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .input('id', sql.Int, Number(req.params.id))
      .query('DELETE FROM dbo.ponto_entrega WHERE id = @id');
    if (!result.rowsAffected[0]) {
      return res.status(404).json({ message: 'Ponto de entrega não encontrado.' });
    }
    return res.json({ message: 'Ponto de entrega excluído com sucesso.' });
  } catch (error) {
    if (error.number === 547) {
      return res.status(409).json({
        message: 'O ponto de entrega é origem ou destino de uma rota. Desative-o em vez de excluir.'
      });
    }
    console.error('[pontos-entrega]', error);
    return res.status(500).json({ message: 'Erro ao excluir ponto de entrega.' });
  }
}

module.exports = {
  listarPontosEntrega,
  buscarPontoEntregaPorId,
  criarPontoEntrega,
  atualizarPontoEntrega,
  excluirPontoEntrega
};
