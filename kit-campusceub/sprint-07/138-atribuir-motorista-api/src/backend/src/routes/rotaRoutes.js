const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const { listarRotas, buscarRotaPorId, salvarRota, excluirRota, atribuirMotorista } = require('../controllers/rotaController');

const router = express.Router();
router.use(authMiddleware, requirePerfil('administrador', 'gestor'));
router.param('id', (req, res, next, id) => {
  if (!/^\d+$/.test(id) || Number(id) < 1 || Number(id) > 2147483647) {
    return res.status(400).json({ message: 'ID da rota inválido.' });
  }
  next();
});

router.get('/', listarRotas);
router.get('/:id', buscarRotaPorId);
router.post('/', salvarRota);
router.put('/:id', salvarRota);
router.patch('/:id/motorista', atribuirMotorista);
router.delete('/:id', excluirRota);

module.exports = router;
