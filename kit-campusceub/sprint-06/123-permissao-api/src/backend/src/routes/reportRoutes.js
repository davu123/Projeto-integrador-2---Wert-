const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const {
  listarRelatorios,
  gerarRelatorio
} = require('../controllers/reportController');

const router = express.Router();

const relatorios = ['administrador', 'gestor', 'auditor'];

router.get('/', authMiddleware, requirePerfil(...relatorios), listarRelatorios);
router.post('/gerar', authMiddleware, requirePerfil(...relatorios), gerarRelatorio);

module.exports = router;
