const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listarAgencias,
  buscarAgenciaPorId,
  criarAgencia,
  atualizarAgencia,
  excluirAgencia
} = require('../controllers/agencyController');

const router = express.Router();

router.get('/', authMiddleware, listarAgencias);
router.get('/:id', authMiddleware, buscarAgenciaPorId);
router.post('/', authMiddleware, criarAgencia);
router.put('/:id', authMiddleware, atualizarAgencia);
router.delete('/:id', authMiddleware, excluirAgencia);

module.exports = router;