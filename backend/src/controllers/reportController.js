const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { getConnection, sql } = require('../config/database');

function gerarNomeArquivo(loteId) {
  const agora = new Date();
  const stamp = `${agora.getFullYear()}${String(agora.getMonth() + 1).padStart(2, '0')}${String(agora.getDate()).padStart(2, '0')}_${String(agora.getHours()).padStart(2, '0')}${String(agora.getMinutes()).padStart(2, '0')}${String(agora.getSeconds()).padStart(2, '0')}`;
  return `relatorio_lote_${loteId}_${stamp}.pdf`;
}

async function listarRelatorios(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT
        r.id,
        r.lote_id,
        r.gerado_por,
        r.data_geracao,
        r.arquivo_pdf_url
      FROM dbo.relatorio r
      ORDER BY r.id DESC
    `);

    return res.json(result.recordset);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar relatórios.',
      error: error.message
    });
  }
}

async function gerarRelatorio(req, res) {
  try {
    const { lote_id } = req.body;

    if (!lote_id) {
      return res.status(400).json({
        message: 'O campo lote_id é obrigatório.'
      });
    }

    const pool = await getConnection();

    const loteResult = await pool
      .request()
      .input('lote_id', sql.Int, Number(lote_id))
      .query(`
        SELECT
          l.id,
          l.data_coleta,
          l.status,
          l.observacoes,
          a.nome AS agencia_nome,
          a.codigo_agencia,
          a.cidade,
          a.uf,
          u.nome AS tecnico_nome
        FROM dbo.lote l
        INNER JOIN dbo.agencia a ON a.id = l.agencia_id
        INNER JOIN dbo.usuario u ON u.id = l.tecnico_id
        WHERE l.id = @lote_id
      `);

    const lote = loteResult.recordset[0];

    if (!lote) {
      return res.status(404).json({ message: 'Lote não encontrado.' });
    }

    const equipamentosResult = await pool
      .request()
      .input('lote_id', sql.Int, Number(lote_id))
      .query(`
        SELECT
          e.id,
          e.tipo,
          e.marca,
          e.modelo,
          e.numero_serie,
          e.estado,
          d.tipo_destino,
          d.empresa,
          d.data AS data_destinacao,
          d.certificado_url
        FROM dbo.equipamento e
        LEFT JOIN dbo.destinacao d ON d.equipamento_id = e.id
        WHERE e.lote_id = @lote_id
        ORDER BY e.id ASC
      `);

    const equipamentos = equipamentosResult.recordset;

    const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'reports');
    fs.mkdirSync(uploadsDir, { recursive: true });

    const nomeArquivo = gerarNomeArquivo(lote_id);
    const caminhoArquivo = path.join(uploadsDir, nomeArquivo);
    const arquivoPdfUrl = `/uploads/reports/${nomeArquivo}`;

    const doc = new PDFDocument({ margin: 40 });
    const stream = fs.createWriteStream(caminhoArquivo);

    doc.pipe(stream);

    doc.fontSize(20).text('EcoTrack Wert', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(14).text('Relatório de Conformidade Ambiental', { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text(`Lote: ${lote.id}`);
    doc.text(`Data da coleta: ${new Date(lote.data_coleta).toLocaleDateString('pt-BR')}`);
    doc.text(`Status: ${lote.status}`);
    doc.text(`Agência: ${lote.agencia_nome} (${lote.codigo_agencia})`);
    doc.text(`Cidade/UF: ${lote.cidade} - ${lote.uf}`);
    doc.text(`Técnico responsável: ${lote.tecnico_nome}`);
    doc.text(`Observações: ${lote.observacoes || '-'}`);
    doc.moveDown();

    doc.fontSize(14).text('Equipamentos');
    doc.moveDown(0.5);

    if (equipamentos.length === 0) {
      doc.fontSize(11).text('Nenhum equipamento encontrado neste lote.');
    } else {
      equipamentos.forEach((equipamento, index) => {
        doc.fontSize(11).text(
          `${index + 1}. ${equipamento.tipo} | ${equipamento.marca} | ${equipamento.modelo}`
        );
        doc.text(`   Série: ${equipamento.numero_serie || '-'}`);
        doc.text(`   Estado: ${equipamento.estado || '-'}`);
        doc.text(`   Destino: ${equipamento.tipo_destino || 'Não registrado'}`);
        doc.text(`   Empresa: ${equipamento.empresa || '-'}`);
        doc.text(
          `   Data da destinação: ${
            equipamento.data_destinacao
              ? new Date(equipamento.data_destinacao).toLocaleDateString('pt-BR')
              : '-'
          }`
        );
        doc.text(`   Certificado: ${equipamento.certificado_url || '-'}`);
        doc.moveDown(0.5);
      });
    }

    doc.end();

    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });

    const geradoPor = req.usuario?.id || null;

    const insertResult = await pool
      .request()
      .input('lote_id', sql.Int, Number(lote_id))
      .input('gerado_por', sql.Int, geradoPor)
      .input('arquivo_pdf_url', sql.NVarChar, arquivoPdfUrl)
      .query(`
        INSERT INTO dbo.relatorio (
          lote_id,
          gerado_por,
          arquivo_pdf_url
        )
        OUTPUT
          INSERTED.id,
          INSERTED.lote_id,
          INSERTED.gerado_por,
          INSERTED.data_geracao,
          INSERTED.arquivo_pdf_url
        VALUES (
          @lote_id,
          @gerado_por,
          @arquivo_pdf_url
        )
      `);

    return res.status(201).json({
      message: 'Relatório gerado com sucesso.',
      relatorio: insertResult.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao gerar relatório.',
      error: error.message
    });
  }
}

module.exports = {
  listarRelatorios,
  gerarRelatorio
};
