const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarLotes,
  buscarLotePorId,
  criarLote,
  atualizarLote,
  atualizarStatusLote
} = require('../controllers/loteController');

const router = express.Router();

const leitura = ['administrador', 'gestor', 'tecnico', 'auditor'];
const escrita = ['administrador', 'gestor', 'tecnico'];

router.get('/', authMiddleware, requirePerfil(...leitura), listarLotes);
router.get('/:id', authMiddleware, requirePerfil(...leitura), buscarLotePorId);
router.post('/', authMiddleware, requirePerfil(...escrita), criarLote);
router.put('/:id', authMiddleware, requirePerfil(...escrita), atualizarLote);
router.patch('/:id/status', authMiddleware, requirePerfil(...escrita), atualizarStatusLote);

module.exports = router;
