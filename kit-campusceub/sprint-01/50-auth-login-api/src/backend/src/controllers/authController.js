const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection, sql } = require('../config/database');

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

    if (!usuario.ativo) {
      return res.status(403).json({ message: 'Usuário inativo.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
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
    return res.status(500).json({ message: 'Erro interno ao realizar login.', error: error.message });
  }
}

module.exports = { login };
