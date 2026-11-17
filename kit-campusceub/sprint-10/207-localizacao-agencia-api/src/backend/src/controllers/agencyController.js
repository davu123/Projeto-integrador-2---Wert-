const { getConnection, sql } = require('../config/database');
const { lerCep, lerEndereco, lerCoordenadas } = require('../utils/localizacao');

// CEP, endereço e coordenadas do corpo. Na edição, campo que não veio no corpo fica como está.
function lerLocalizacao(corpo) {
  const cep = lerCep(corpo.cep);
  if (cep.erro) return { erro: cep.erro };
  const endereco = lerEndereco(corpo.endereco);
  if (endereco.erro) return { erro: endereco.erro };
  const coordenadas = lerCoordenadas(corpo.latitude, corpo.longitude);
  if (coordenadas.erro) return { erro: coordenadas.erro };

  return {
    cep: cep.valor,
    endereco: endereco.valor,
    latitude: coordenadas.latitude,
    longitude: coordenadas.longitude,
    enviado: {
      cep: corpo.cep !== undefined,
      endereco: corpo.endereco !== undefined,
      coordenadas: corpo.latitude !== undefined || corpo.longitude !== undefined
    }
  };
}

function inputsLocalizacao(request, localizacao) {
  return request
    .input('cep', sql.Char(8), localizacao.cep)
    .input('endereco', sql.NVarChar(200), localizacao.endereco)
    .input('latitude', sql.Decimal(9, 6), localizacao.latitude)
    .input('longitude', sql.Decimal(9, 6), localizacao.longitude);
}

async function listarAgencias(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT
        id,
        nome,
        codigo_agencia,
        cidade,
        uf,
        responsavel,
        telefone,
        cep,
        endereco,
        latitude,
        longitude,
        criada_em,
        atualizada_em
      FROM dbo.agencia
      ORDER BY id DESC
    `);

    return res.json(result.recordset);
  } catch (error) {
    console.error('[agencias]', error);
    return res.status(500).json({
      message: 'Erro ao listar agências.'
    });
  }
}

async function buscarAgenciaPorId(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT
          id,
          nome,
          codigo_agencia,
          cidade,
          uf,
          responsavel,
          telefone,
          cep,
          endereco,
          latitude,
          longitude,
          criada_em,
          atualizada_em
        FROM dbo.agencia
        WHERE id = @id
      `);

    const agencia = result.recordset[0];

    if (!agencia) {
      return res.status(404).json({ message: 'Agência não encontrada.' });
    }

    return res.json(agencia);
  } catch (error) {
    console.error('[agencias]', error);
    return res.status(500).json({
      message: 'Erro ao buscar agência.'
    });
  }
}

async function criarAgencia(req, res) {
  try {
    const { nome, codigo_agencia, cidade, uf, responsavel, telefone } = req.body;

    if (!nome || !codigo_agencia || !cidade || !uf) {
      return res.status(400).json({
        message: 'nome, codigo_agencia, cidade e uf são obrigatórios.'
      });
    }

    const localizacao = lerLocalizacao(req.body);
    if (localizacao.erro) {
      return res.status(400).json({ message: localizacao.erro });
    }

    const pool = await getConnection();

    const codigoExiste = await pool
      .request()
      .input('codigo_agencia', sql.NVarChar, codigo_agencia)
      .query(`
        SELECT TOP 1 id
        FROM dbo.agencia
        WHERE codigo_agencia = @codigo_agencia
      `);

    if (codigoExiste.recordset[0]) {
      return res.status(409).json({
        message: 'Já existe uma agência com este código.'
      });
    }

    const result = await inputsLocalizacao(pool.request(), localizacao)
      .input('nome', sql.NVarChar, nome)
      .input('codigo_agencia', sql.NVarChar, codigo_agencia)
      .input('cidade', sql.NVarChar, cidade)
      .input('uf', sql.Char(2), uf.toUpperCase())
      .input('responsavel', sql.NVarChar, responsavel || null)
      .input('telefone', sql.NVarChar, telefone || null)
      .query(`
        INSERT INTO dbo.agencia (
          nome,
          codigo_agencia,
          cidade,
          uf,
          responsavel,
          telefone,
          cep,
          endereco,
          latitude,
          longitude
        )
        OUTPUT
          INSERTED.id,
          INSERTED.nome,
          INSERTED.codigo_agencia,
          INSERTED.cidade,
          INSERTED.uf,
          INSERTED.responsavel,
          INSERTED.telefone,
          INSERTED.cep,
          INSERTED.endereco,
          INSERTED.latitude,
          INSERTED.longitude,
          INSERTED.criada_em,
          INSERTED.atualizada_em
        VALUES (
          @nome,
          @codigo_agencia,
          @cidade,
          @uf,
          @responsavel,
          @telefone,
          @cep,
          @endereco,
          @latitude,
          @longitude
        )
      `);

    return res.status(201).json({
      message: 'Agência criada com sucesso.',
      agencia: result.recordset[0]
    });
  } catch (error) {
    console.error('[agencias]', error);
    return res.status(500).json({
      message: 'Erro ao criar agência.'
    });
  }
}

async function atualizarAgencia(req, res) {
  try {
    const { id } = req.params;
    const { nome, codigo_agencia, cidade, uf, responsavel, telefone } = req.body;

    if (!nome || !codigo_agencia || !cidade || !uf) {
      return res.status(400).json({
        message: 'nome, codigo_agencia, cidade e uf são obrigatórios.'
      });
    }

    const localizacao = lerLocalizacao(req.body);
    if (localizacao.erro) {
      return res.status(400).json({ message: localizacao.erro });
    }

    const pool = await getConnection();

    const agenciaExiste = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.agencia
        WHERE id = @id
      `);

    if (!agenciaExiste.recordset[0]) {
      return res.status(404).json({ message: 'Agência não encontrada.' });
    }

    const codigoEmUso = await pool
      .request()
      .input('codigo_agencia', sql.NVarChar, codigo_agencia)
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.agencia
        WHERE codigo_agencia = @codigo_agencia
          AND id <> @id
      `);

    if (codigoEmUso.recordset[0]) {
      return res.status(409).json({
        message: 'Já existe outra agência com este código.'
      });
    }

    const result = await inputsLocalizacao(pool.request(), localizacao)
      .input('cep_enviado', sql.Bit, localizacao.enviado.cep)
      .input('endereco_enviado', sql.Bit, localizacao.enviado.endereco)
      .input('coordenadas_enviadas', sql.Bit, localizacao.enviado.coordenadas)
      .input('id', sql.Int, Number(id))
      .input('nome', sql.NVarChar, nome)
      .input('codigo_agencia', sql.NVarChar, codigo_agencia)
      .input('cidade', sql.NVarChar, cidade)
      .input('uf', sql.Char(2), uf.toUpperCase())
      .input('responsavel', sql.NVarChar, responsavel || null)
      .input('telefone', sql.NVarChar, telefone || null)
      .query(`
        UPDATE dbo.agencia
        SET
          nome = @nome,
          codigo_agencia = @codigo_agencia,
          cidade = @cidade,
          uf = @uf,
          responsavel = @responsavel,
          telefone = @telefone,
          cep = CASE WHEN @cep_enviado = 1 THEN @cep ELSE cep END,
          endereco = CASE WHEN @endereco_enviado = 1 THEN @endereco ELSE endereco END,
          latitude = CASE WHEN @coordenadas_enviadas = 1 THEN @latitude ELSE latitude END,
          longitude = CASE WHEN @coordenadas_enviadas = 1 THEN @longitude ELSE longitude END,
          atualizada_em = SYSDATETIME()
        OUTPUT
          INSERTED.id,
          INSERTED.nome,
          INSERTED.codigo_agencia,
          INSERTED.cidade,
          INSERTED.uf,
          INSERTED.responsavel,
          INSERTED.telefone,
          INSERTED.cep,
          INSERTED.endereco,
          INSERTED.latitude,
          INSERTED.longitude,
          INSERTED.criada_em,
          INSERTED.atualizada_em
        WHERE id = @id
      `);

    return res.json({
      message: 'Agência atualizada com sucesso.',
      agencia: result.recordset[0]
    });
  } catch (error) {
    console.error('[agencias]', error);
    return res.status(500).json({
      message: 'Erro ao atualizar agência.'
    });
  }
}

async function excluirAgencia(req, res) {
  try {
    const { id } = req.params;
    const pool = await getConnection();

    const agenciaExiste = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.agencia
        WHERE id = @id
      `);

    if (!agenciaExiste.recordset[0]) {
      return res.status(404).json({ message: 'Agência não encontrada.' });
    }

    await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        DELETE FROM dbo.agencia
        WHERE id = @id
      `);

    return res.json({
      message: 'Agência excluída com sucesso.'
    });
  } catch (error) {
    if (error.message && error.message.toLowerCase().includes('reference constraint')) {
      return res.status(409).json({
        message: 'Não é possível excluir a agência porque ela está vinculada a lotes.'
      });
    }

    console.error('[agencias]', error);
    return res.status(500).json({
      message: 'Erro ao excluir agência.'
    });
  }
}

module.exports = {
  listarAgencias,
  buscarAgenciaPorId,
  criarAgencia,
  atualizarAgencia,
  excluirAgencia
};