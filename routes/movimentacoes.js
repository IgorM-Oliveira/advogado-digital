const express = require("express");
const router = express.Router();
const movimentacoesController = require("../controllers/movimentacoesController");
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Listar todos os movimentacoess
router.get("/", movimentacoesController.listarMovimentacoes);

// Obter um movimentacoes pelo ID
router.get("/:id", movimentacoesController.obterMovimentacao);

// Criar um novo movimentacoes
router.post("/", movimentacoesController.criarMovimentacao);

// Atualizar um movimentacoes
router.put("/:id", movimentacoesController.atualizarMovimentacao);

// Excluir um movimentacoes
router.delete("/:id", movimentacoesController.excluirMovimentacao);

module.exports = router;
