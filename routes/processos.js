const express = require("express");
const router = express.Router();
const processosController = require("../controllers/processosController");
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Listar todos os processos
router.get("/", processosController.listarProcessos);

// Obter um cliente pelo ID
router.get("/:id", processosController.obterProcesso);

// Criar um novo cliente
router.post("/", processosController.criarProcesso);

// Atualizar um cliente
router.put("/:id", processosController.atualizarProcesso);

// Excluir um cliente
router.delete("/:id", processosController.excluirProcesso);

module.exports = router;
