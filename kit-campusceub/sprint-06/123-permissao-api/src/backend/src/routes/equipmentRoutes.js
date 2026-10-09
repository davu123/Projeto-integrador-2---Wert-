const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const { listarEquipamentos, cadastrarEquipamento } = require('../controllers/equipmentController');

const router = express.Router();

const leitura = ['administrador', 'gestor', 'tecnico', 'auditor'];
const escrita = ['administrador', 'gestor', 'tecnico'];

router.get('/', authMiddleware, requirePerfil(...leitura), listarEquipamentos);
router.post('/', authMiddleware, requirePerfil(...escrita), cadastrarEquipamento);

module.exports = router;
