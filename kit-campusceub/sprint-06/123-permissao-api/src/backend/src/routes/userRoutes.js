const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  atualizarStatusUsuario
} = require('../controllers/userController');

const router = express.Router();

const leitura = ['administrador', 'gestor', 'tecnico', 'auditor'];
const escrita = ['administrador'];

router.get('/', authMiddleware, requirePerfil(...leitura), listarUsuarios);
router.get('/:id', authMiddleware, requirePerfil(...leitura), buscarUsuarioPorId);
router.post('/', authMiddleware, requirePerfil(...escrita), criarUsuario);
router.put('/:id', authMiddleware, requirePerfil(...escrita), atualizarUsuario);
router.patch('/:id/status', authMiddleware, requirePerfil(...escrita), atualizarStatusUsuario);

module.exports = router;
