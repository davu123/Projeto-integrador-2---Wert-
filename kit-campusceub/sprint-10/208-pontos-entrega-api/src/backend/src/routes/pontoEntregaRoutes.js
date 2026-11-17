const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarPontosEntrega,
  buscarPontoEntregaPorId,
  criarPontoEntrega,
  atualizarPontoEntrega,
  excluirPontoEntrega
} = require('../controllers/pontoEntregaController');

const router = express.Router();

// Pontos de entrega: só administrador e gestor consultam e alteram.
router.use(authMiddleware, requirePerfil('administrador', 'gestor'));
router.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id) || Number(id) < 1 || Number(id) > 2147483647) {
    return res.status(400).json({ message: 'ID do ponto de entrega inválido.' });
  }
  next();
});

router.get('/', listarPontosEntrega);
router.get('/:id', buscarPontoEntregaPorId);
router.post('/', criarPontoEntrega);
router.put('/:id', atualizarPontoEntrega);
router.delete('/:id', excluirPontoEntrega);

module.exports = router;
