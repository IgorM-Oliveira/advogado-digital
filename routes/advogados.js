const express = require("express");
const router = express.Router();
const advogadosController = require("../controllers/advogadosController");
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// Listar todos os advogados
router.get("/", advogadosController.listarAdvogados);

// Obter um advogado pelo ID
router.get("/:id", advogadosController.obterAdvogado);

// Criar um novo advogado
router.post("/", advogadosController.criarAdvogado);

// Atualizar um advogado
router.put("/:id", advogadosController.atualizarAdvogado);

// Excluir um advogado
router.delete("/:id", advogadosController.excluirAdvogado);

module.exports = router;
