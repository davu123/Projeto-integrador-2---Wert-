const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { listarEquipamentos, cadastrarEquipamento } = require('../controllers/equipmentController');

const router = express.Router();
router.get('/', authMiddleware, listarEquipamentos);
router.post('/', authMiddleware, cadastrarEquipamento);

module.exports = router;
