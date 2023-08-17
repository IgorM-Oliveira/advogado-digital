const express = require("express");
const router = express.Router();
const partesController = require("../controllers/partesController");
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Listar todos os partes
router.get("/", partesController.listarPartes);

// Obter um cliente pelo ID
router.get("/:id", partesController.obterParte);

// Criar um novo cliente
router.post("/", partesController.criarParte);

// Atualizar um cliente
router.put("/:id", partesController.atualizarParte);

// Excluir um cliente
router.delete("/:id", partesController.excluirParte);

module.exports = router;
