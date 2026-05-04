const bcrypt = require('bcrypt');
const { getConnection, sql } = require('../config/database');

const PERFIS_VALIDOS = ['administrador', 'tecnico', 'gestor', 'auditor'];

async function listarUsuarios(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(`
      SELECT
        id,
        nome,
        email,
        perfil,
        ativo,
        criado_em,
        atualizado_em
      FROM dbo.usuario
      ORDER BY id DESC
    `);

    return res.json(result.recordset);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao listar usuários.',
      error: error.message
    });
  }
}

async function buscarUsuarioPorId(req, res) {
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
          email,
          perfil,
          ativo,
          criado_em,
          atualizado_em
        FROM dbo.usuario
        WHERE id = @id
      `);

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao buscar usuário.',
      error: error.message
    });
  }
}

async function criarUsuario(req, res) {
  try {
    const { nome, email, senha, perfil, ativo } = req.body;

    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({
        message: 'nome, email, senha e perfil são obrigatórios.'
      });
    }

    if (!PERFIS_VALIDOS.includes(perfil)) {
      return res.status(400).json({
        message: 'Perfil inválido.'
      });
    }

    const pool = await getConnection();

    const emailExiste = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .query(`
        SELECT TOP 1 id
        FROM dbo.usuario
        WHERE email = @email
      `);

    if (emailExiste.recordset[0]) {
      return res.status(409).json({
        message: 'Já existe um usuário com este e-mail.'
      });
    }

    const senha_hash = await bcrypt.hash(senha, 10);

    const result = await pool
      .request()
      .input('nome', sql.NVarChar, nome)
      .input('email', sql.NVarChar, email)
      .input('senha_hash', sql.NVarChar, senha_hash)
      .input('perfil', sql.NVarChar, perfil)
      .input('ativo', sql.Bit, ativo !== undefined ? ativo : true)
      .query(`
        INSERT INTO dbo.usuario (
          nome,
          email,
          senha_hash,
          perfil,
          ativo
        )
        OUTPUT
          INSERTED.id,
          INSERTED.nome,
          INSERTED.email,
          INSERTED.perfil,
          INSERTED.ativo,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        VALUES (
          @nome,
          @email,
          @senha_hash,
          @perfil,
          @ativo
        )
      `);

    return res.status(201).json({
      message: 'Usuário criado com sucesso.',
      usuario: result.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao criar usuário.',
      error: error.message
    });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, perfil, ativo, senha } = req.body;

    if (!nome || !email || !perfil) {
      return res.status(400).json({
        message: 'nome, email e perfil são obrigatórios.'
      });
    }

    if (!PERFIS_VALIDOS.includes(perfil)) {
      return res.status(400).json({
        message: 'Perfil inválido.'
      });
    }

    const pool = await getConnection();

    const usuarioExiste = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.usuario
        WHERE id = @id
      `);

    if (!usuarioExiste.recordset[0]) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const emailEmUso = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .input('id', sql.Int, Number(id))
      .query(`
        SELECT TOP 1 id
        FROM dbo.usuario
        WHERE email = @email
          AND id <> @id
      `);

    if (emailEmUso.recordset[0]) {
      return res.status(409).json({
        message: 'Já existe outro usuário com este e-mail.'
      });
    }

    let senha_hash = null;

    if (senha) {
      senha_hash = await bcrypt.hash(senha, 10);
    }

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .input('nome', sql.NVarChar, nome)
      .input('email', sql.NVarChar, email)
      .input('perfil', sql.NVarChar, perfil)
      .input('ativo', sql.Bit, ativo !== undefined ? ativo : true)
      .input('senha_hash', sql.NVarChar, senha_hash)
      .query(`
        UPDATE dbo.usuario
        SET
          nome = @nome,
          email = @email,
          perfil = @perfil,
          ativo = @ativo,
          senha_hash = COALESCE(@senha_hash, senha_hash),
          atualizado_em = SYSDATETIME()
        OUTPUT
          INSERTED.id,
          INSERTED.nome,
          INSERTED.email,
          INSERTED.perfil,
          INSERTED.ativo,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        WHERE id = @id
      `);

    return res.json({
      message: 'Usuário atualizado com sucesso.',
      usuario: result.recordset[0]
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar usuário.',
      error: error.message
    });
  }
}

async function atualizarStatusUsuario(req, res) {
  try {
    const { id } = req.params;
    const { ativo } = req.body;

    if (ativo === undefined) {
      return res.status(400).json({
        message: 'O campo ativo é obrigatório.'
      });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input('id', sql.Int, Number(id))
      .input('ativo', sql.Bit, !!ativo)
      .query(`
        UPDATE dbo.usuario
        SET
          ativo = @ativo,
          atualizado_em = SYSDATETIME()
        OUTPUT
          INSERTED.id,
          INSERTED.nome,
          INSERTED.email,
          INSERTED.perfil,
          INSERTED.ativo,
          INSERTED.criado_em,
          INSERTED.atualizado_em
        WHERE id = @id
      `);

    const usuario = result.recordset[0];

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    return res.json({
      message: 'Status do usuário atualizado com sucesso.',
      usuario
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro ao atualizar status do usuário.',
      error: error.message
    });
  }
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  atualizarStatusUsuario
};