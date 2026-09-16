const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listarLotes,
  buscarLotePorId,
  criarLote,
  atualizarLote
} = require('../controllers/loteController');

const router = express.Router();

router.get('/', authMiddleware, listarLotes);
router.get('/:id', authMiddleware, buscarLotePorId);
router.post('/', authMiddleware, criarLote);
router.put('/:id', authMiddleware, atualizarLote);

module.exports = router;
