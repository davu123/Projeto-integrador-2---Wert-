const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { obterDashboard } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/', authMiddleware, obterDashboard);

module.exports = router;
