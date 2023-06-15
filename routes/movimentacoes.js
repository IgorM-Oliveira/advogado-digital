const express = require("express");
const router = express.Router();
const movimentacoessController = require("../controllers/movimentacoesController");

// Listar todos os movimentacoess
router.get("/", movimentacoessController.listarMovimentacoes);

// Obter um movimentacoes pelo ID
router.get("/:id", movimentacoessController.obterMovimentacao);

// Criar um novo movimentacoes
router.post("/", movimentacoessController.criarMovimentacao);

// Atualizar um movimentacoes
router.put("/:id", movimentacoessController.atualizarMovimentacao);

// Excluir um movimentacoes
router.delete("/:id", movimentacoessController.excluirMovimentacao);

module.exports = router;
