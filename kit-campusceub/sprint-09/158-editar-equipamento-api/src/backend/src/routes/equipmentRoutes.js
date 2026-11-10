const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const requirePerfil = require('../middlewares/requirePerfil');

const {
  listarEquipamentos,
  cadastrarEquipamento,
  atualizarEquipamento
} = require('../controllers/equipmentController');

const router = express.Router();

router.get(
  '/',
  authMiddleware,
  requirePerfil(
    'administrador',
    'tecnico',
    'gestor',
    'auditor'
  ),
  listarEquipamentos
);

router.post(
  '/',
  authMiddleware,
  requirePerfil(
    'administrador',
    'tecnico',
    'gestor'
  ),
  cadastrarEquipamento
);

router.put(
  '/:id',
  authMiddleware,
  requirePerfil(
    'administrador',
    'tecnico',
    'gestor'
  ),
  atualizarEquipamento
);

module.exports = router;