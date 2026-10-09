const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');
const { obterDashboard } = require('../controllers/dashboardController');

const router = express.Router();

const leitura = ['administrador', 'gestor', 'tecnico', 'auditor', 'motorista'];

router.get('/', authMiddleware, requirePerfil(...leitura), obterDashboard);

module.exports = router;
