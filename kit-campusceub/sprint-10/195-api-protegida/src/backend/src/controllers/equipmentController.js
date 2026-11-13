const { getConnection, sql } = require('../config/database');

async function listarEquipamentos(req, res) {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT
        e.id,
        e.tipo,
        e.marca,
        e.modelo,
        e.numero_serie,
        e.estado,
        e.criado_em,
        l.id AS lote_id,
        a.nome AS agencia_nome
      FROM dbo.equipamento e
      INNER JOIN dbo.lote l ON l.id = e.lote_id
      INNER JOIN dbo.agencia a ON a.id = l.agencia_id
      ORDER BY e.id DESC
    `);

    return res.json(result.recordset);
  } catch (error) {
    console.error('[equipamentos]', error);
    return res.status(500).json({ message: 'Erro ao listar equipamentos.' });
  }
}

async function cadastrarEquipamento(req, res) {
  try {
    const { lote_id, tipo, marca, modelo, numero_serie, estado } = req.body;
    if (!lote_id || !tipo || !marca || !modelo || !estado) {
      return res.status(400).json({ message: 'lote_id, tipo, marca, modelo e estado são obrigatórios.' });
    }

    const estadosValidos = ['bom', 'danificado', 'inutilizavel'];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ message: 'Estado inválido.' });
    }

    const pool = await getConnection();
    const loteExiste = await pool.request().input('lote_id', sql.Int, lote_id).query(`
      SELECT TOP 1 id FROM dbo.lote WHERE id = @lote_id
    `);
    if (!loteExiste.recordset[0]) {
      return res.status(404).json({ message: 'Lote não encontrado.' });
    }

    const result = await pool
      .request()
      .input('lote_id', sql.Int, lote_id)
      .input('tipo', sql.NVarChar, tipo)
      .input('marca', sql.NVarChar, marca)
      .input('modelo', sql.NVarChar, modelo)
      .input('numero_serie', sql.NVarChar, numero_serie || null)
      .input('estado', sql.NVarChar, estado)
      .query(`
        INSERT INTO dbo.equipamento (
          lote_id, tipo, marca, modelo, numero_serie, estado
        )
        OUTPUT INSERTED.*
        VALUES (
          @lote_id, @tipo, @marca, @modelo, @numero_serie, @estado
        )
      `);

    return res.status(201).json({ message: 'Equipamento cadastrado com sucesso.', equipamento: result.recordset[0] });
  } catch (error) {
    if (error.number === 2601 || error.number === 2627) {
      return res.status(409).json({
        message: 'Já existe um equipamento com este número de série.',
      });
    }

    console.error('[equipamentos]', error);
    return res.status(500).json({ message: 'Erro ao cadastrar equipamento.' });
  }
}

// Edita os dados do equipamento. O lote não muda: lote_id no corpo é ignorado.
async function atualizarEquipamento(req, res) {
  const id = /^\d+$/.test(req.params.id) ? Number(req.params.id) : NaN;
  if (!Number.isInteger(id) || id <= 0 || id > 2147483647) {
    return res.status(400).json({ message: 'Equipamento inválido.' });
  }

  const { tipo, marca, modelo, numero_serie, estado } = req.body;
  if (!tipo || !marca || !modelo || !estado) {
    return res.status(400).json({ message: 'tipo, marca, modelo e estado são obrigatórios.' });
  }

  const estadosValidos = ['bom', 'danificado', 'inutilizavel'];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ message: 'Estado inválido.' });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('tipo', sql.NVarChar, tipo)
      .input('marca', sql.NVarChar, marca)
      .input('modelo', sql.NVarChar, modelo)
      .input('numero_serie', sql.NVarChar, numero_serie || null)
      .input('estado', sql.NVarChar, estado)
      .query(`
        UPDATE dbo.equipamento
        SET tipo = @tipo,
            marca = @marca,
            modelo = @modelo,
            numero_serie = @numero_serie,
            estado = @estado,
            atualizado_em = SYSDATETIME()
        OUTPUT INSERTED.*
        WHERE id = @id
      `);

    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'Equipamento não encontrado.' });
    }

    return res.json({ message: 'Equipamento atualizado com sucesso.', equipamento: result.recordset[0] });
  } catch (error) {
    if (error.number === 2601 || error.number === 2627) {
      return res.status(409).json({
        message: 'Já existe um equipamento com este número de série.',
      });
    }

    return res.status(500).json({ message: 'Erro ao atualizar equipamento.' });
  }
}

module.exports = { listarEquipamentos, cadastrarEquipamento, atualizarEquipamento };
