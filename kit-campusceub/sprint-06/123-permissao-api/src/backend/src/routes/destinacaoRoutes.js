const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarDestinacoes,
  buscarDestinacaoPorId,
  criarDestinacao,
  atualizarDestinacao,
  excluirDestinacao
} = require('../controllers/destinacaoController');

const router = express.Router();

const leitura = ['administrador', 'gestor', 'tecnico', 'auditor'];
const escrita = ['administrador', 'gestor', 'tecnico'];

router.get('/', authMiddleware, requirePerfil(...leitura), listarDestinacoes);
router.get('/:id', authMiddleware, requirePerfil(...leitura), buscarDestinacaoPorId);
router.post('/', authMiddleware, requirePerfil(...escrita), criarDestinacao);
router.put('/:id', authMiddleware, requirePerfil(...escrita), atualizarDestinacao);
router.delete('/:id', authMiddleware, requirePerfil(...escrita), excluirDestinacao);

module.exports = router;
