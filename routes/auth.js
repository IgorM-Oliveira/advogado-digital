const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para autenticação
router.post('/', authController.login);

module.exports = router;
