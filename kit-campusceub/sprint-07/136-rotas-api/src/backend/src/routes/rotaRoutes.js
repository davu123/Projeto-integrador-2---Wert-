const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarRotas,
  buscarRotaPorId,
  criarRota,
  atualizarRota,
  excluirRota
} = require('../controllers/rotaController');

const router = express.Router();

const planejamento = ['administrador', 'gestor'];

router.get('/', authMiddleware, requirePerfil(...planejamento), listarRotas);
router.get('/:id', authMiddleware, requirePerfil(...planejamento), buscarRotaPorId);
router.post('/', authMiddleware, requirePerfil(...planejamento), criarRota);
router.put('/:id', authMiddleware, requirePerfil(...planejamento), atualizarRota);
router.delete('/:id', authMiddleware, requirePerfil(...planejamento), excluirRota);

module.exports = router;
