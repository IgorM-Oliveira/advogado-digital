const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para autenticação
router.post('/', authController.login);

// Rota para autenticação client
router.post('/client', authController.login_cliente);

module.exports = router;
