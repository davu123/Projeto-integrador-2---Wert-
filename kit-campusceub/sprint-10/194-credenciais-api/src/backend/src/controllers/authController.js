const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection, sql } = require('../config/database');

const SENHA_MINIMA = 8;

async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
    }

    const pool = await getConnection();
    const result = await pool.request().input('email', sql.NVarChar, email).query(`
      SELECT TOP 1 id, nome, email, senha_hash, perfil, ativo
      FROM dbo.usuario
      WHERE email = @email
    `);

    const usuario = result.recordset[0];
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // A senha é conferida antes do status: sem a senha certa, ninguém descobre que a conta existe e está inativa.
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    if (!usuario.ativo) {
      return res.status(403).json({ message: 'Usuário inativo.' });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    return res.json({
      message: 'Login realizado com sucesso.',
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    });
  } catch (error) {
    console.error('[auth] erro no login:', error);
    return res.status(500).json({ message: 'Erro interno ao realizar login.' });
  }
}

// Troca a senha do usuário logado. Senha atual errada devolve 400, e não 401,
// porque a tela encerra a sessão em qualquer 401.
async function alterarSenha(req, res) {
  const { senha_atual, nova_senha } = req.body || {};

  if (typeof senha_atual !== 'string' || typeof nova_senha !== 'string' || !senha_atual || !nova_senha) {
    return res.status(400).json({ message: 'Informe a senha atual e a nova senha.' });
  }

  if (nova_senha.length < SENHA_MINIMA) {
    return res.status(400).json({ message: `A nova senha deve ter pelo menos ${SENHA_MINIMA} caracteres.` });
  }

  if (nova_senha === senha_atual) {
    return res.status(400).json({ message: 'A nova senha deve ser diferente da atual.' });
  }

  try {
    const pool = await getConnection();
    const result = await pool.request().input('id', sql.Int, req.usuario.id).query(`
      SELECT TOP 1 id, senha_hash, ativo FROM dbo.usuario WHERE id = @id
    `);

    const usuario = result.recordset[0];
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    if (!usuario.ativo) {
      return res.status(403).json({ message: 'Usuário inativo.' });
    }

    const senhaValida = await bcrypt.compare(senha_atual, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(400).json({ message: 'Senha atual incorreta.' });
    }

    const senhaHash = await bcrypt.hash(nova_senha, 10);
    await pool
      .request()
      .input('id', sql.Int, usuario.id)
      .input('senha_hash', sql.NVarChar, senhaHash)
      .query(`
        UPDATE dbo.usuario
        SET senha_hash = @senha_hash, atualizado_em = SYSDATETIME()
        WHERE id = @id
      `);

    return res.json({ message: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error('[auth] erro ao alterar senha:', error);
    return res.status(500).json({ message: 'Erro ao alterar senha.' });
  }
}

module.exports = { login, alterarSenha };
