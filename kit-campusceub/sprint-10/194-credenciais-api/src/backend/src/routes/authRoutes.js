const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { login, alterarSenha } = require('../controllers/authController');

const router = express.Router();
router.post('/login', login);
router.put('/senha', authMiddleware, alterarSenha);

module.exports = router;
