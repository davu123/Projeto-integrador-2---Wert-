const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  atualizarStatusUsuario
} = require('../controllers/userController');

const router = express.Router();

router.get('/', authMiddleware, listarUsuarios);
router.get('/:id', authMiddleware, buscarUsuarioPorId);
router.post('/', authMiddleware, criarUsuario);
router.put('/:id', authMiddleware, atualizarUsuario);
router.patch('/:id/status', authMiddleware, atualizarStatusUsuario);

module.exports = router;