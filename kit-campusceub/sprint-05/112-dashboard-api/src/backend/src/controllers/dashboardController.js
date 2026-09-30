const { getConnection } = require('../config/database');

function mapCountRows(rows, keyField) {
  return rows.map((row) => ({
    label: row[keyField] || 'Não informado',
    total: Number(row.total || 0),
  }));
}

async function obterDashboard(req, res) {
  try {
    const pool = await getConnection();

    const [
      equipamentosResult,
      lotesResult,
      agenciasResult,
      destinacoesResult,
      lotesStatusResult,
      equipamentosTipoResult,
      equipamentosEstadoResult,
      destinacoesTipoResult,
    ] = await Promise.all([
      pool.request().query('SELECT COUNT(*) AS total FROM dbo.equipamento'),
      pool.request().query('SELECT COUNT(*) AS total FROM dbo.lote'),
      pool.request().query('SELECT COUNT(*) AS total FROM dbo.agencia'),
      pool.request().query('SELECT COUNT(*) AS total FROM dbo.destinacao'),
      pool.request().query(`
        SELECT status, COUNT(*) AS total
        FROM dbo.lote
        GROUP BY status
        ORDER BY status
      `),
      pool.request().query(`
        SELECT tipo, COUNT(*) AS total
        FROM dbo.equipamento
        GROUP BY tipo
        ORDER BY total DESC, tipo
      `),
      pool.request().query(`
        SELECT estado, COUNT(*) AS total
        FROM dbo.equipamento
        GROUP BY estado
        ORDER BY total DESC, estado
      `),
      pool.request().query(`
        SELECT tipo_destino, COUNT(*) AS total
        FROM dbo.destinacao
        GROUP BY tipo_destino
        ORDER BY total DESC, tipo_destino
      `),
    ]);

    return res.json({
      indicadores: {
        equipamentos: Number(equipamentosResult.recordset[0]?.total || 0),
        lotes: Number(lotesResult.recordset[0]?.total || 0),
        agencias: Number(agenciasResult.recordset[0]?.total || 0),
        destinacoes: Number(destinacoesResult.recordset[0]?.total || 0),
      },
      lotesPorStatus: mapCountRows(lotesStatusResult.recordset, 'status'),
      equipamentosPorTipo: mapCountRows(equipamentosTipoResult.recordset, 'tipo'),
      equipamentosPorEstado: mapCountRows(equipamentosEstadoResult.recordset, 'estado'),
      destinacoesPorTipo: mapCountRows(destinacoesTipoResult.recordset, 'tipo_destino'),
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao carregar dashboard.',
      error: error.message,
    });
  }
}

module.exports = { obterDashboard };
