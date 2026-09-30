const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  listarRelatorios,
  gerarRelatorio
} = require('../controllers/reportController');

const router = express.Router();

router.get('/', authMiddleware, listarRelatorios);
router.post('/gerar', authMiddleware, gerarRelatorio);

module.exports = router;
