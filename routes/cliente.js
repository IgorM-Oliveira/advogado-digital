const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

// Listar todos os clientes
router.get("/", clientesController.listarClientes);

// Obter um cliente pelo ID
router.get("/:id", clientesController.obterCliente);

// Criar um novo cliente
router.post("/", clientesController.criarCliente);

// Atualizar um cliente
router.put("/:id", clientesController.atualizarCliente);

// Excluir um cliente
router.delete("/:id", clientesController.excluirCliente);

module.exports = router;
