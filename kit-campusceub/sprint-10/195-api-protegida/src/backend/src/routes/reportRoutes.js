const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');

const {
  listarRelatorios,
  baixarRelatorio,
  gerarRelatorio
} = require('../controllers/reportController');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  requirePerfil(
    'administrador',
    'gestor',
    'auditor'
  ),
  listarRelatorios
);

router.get(
  '/:id/arquivo',
  authMiddleware,
  requirePerfil(
    'administrador',
    'gestor',
    'auditor'
  ),
  baixarRelatorio
);

router.post(
  '/gerar',
  authMiddleware,
  requirePerfil(
    'administrador',
    'gestor',
    'auditor'
  ),
  gerarRelatorio
);

module.exports = router;