const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarAgencias,
  buscarAgenciaPorId,
  criarAgencia,
  atualizarAgencia,
  excluirAgencia
} = require('../controllers/agencyController');

const router = express.Router();

const leitura = ['administrador', 'gestor', 'tecnico', 'auditor'];
const escrita = ['administrador', 'gestor'];

router.get('/', authMiddleware, requirePerfil(...leitura), listarAgencias);
router.get('/:id', authMiddleware, requirePerfil(...leitura), buscarAgenciaPorId);
router.post('/', authMiddleware, requirePerfil(...escrita), criarAgencia);
router.put('/:id', authMiddleware, requirePerfil(...escrita), atualizarAgencia);
router.delete('/:id', authMiddleware, requirePerfil(...escrita), excluirAgencia);

module.exports = router;
