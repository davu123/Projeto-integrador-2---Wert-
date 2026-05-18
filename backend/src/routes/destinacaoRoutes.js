const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listarDestinacoes,
  buscarDestinacaoPorId,
  criarDestinacao,
  atualizarDestinacao,
  excluirDestinacao
} = require('../controllers/destinacaoController');

const router = express.Router();

router.get('/', authMiddleware, listarDestinacoes);
router.get('/:id', authMiddleware, buscarDestinacaoPorId);
router.post('/', authMiddleware, criarDestinacao);
router.put('/:id', authMiddleware, atualizarDestinacao);
router.delete('/:id', authMiddleware, excluirDestinacao);

module.exports = router;