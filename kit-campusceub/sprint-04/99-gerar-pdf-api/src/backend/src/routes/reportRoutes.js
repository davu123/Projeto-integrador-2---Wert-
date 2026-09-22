const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { gerarRelatorio } = require('../controllers/reportController');

const router = express.Router();

router.post('/gerar', authMiddleware, gerarRelatorio);

module.exports = router;
