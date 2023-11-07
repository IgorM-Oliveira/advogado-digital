const express = require("express");
const axios = require('axios');
const router = express.Router();
const processosController = require("../controllers/processosController");
const authMiddleware = require('../middlewares/authMiddleware');

const { storage } = require("../multerConfig")

const multer = require('multer');
const upload = multer({ storage: storage });

router.use(authMiddleware);

// Listar todos os processos
router.get("/", processosController.listarProcessos);

// Listar todos os processos vinculados
router.get("/vinculados/:id", processosController.listarProcessosVinculados);

// Listar todos os tipos de processos
router.get("/tipos", processosController.listarTiposProcessos);

// Obter um cliente pelo ID
router.get("/:id", processosController.obterProcesso);

// Criar um novo cliente
router.post("/", processosController.criarProcesso);

// Atualizar um cliente
router.put("/:id", processosController.atualizarProcesso);

// Excluir um cliente
router.delete("/:id", processosController.excluirProcesso);

// Excluir um cliente
router.post("/upload/remove/:id", processosController.uploadProcessoRemove);

// Upload de arquivos
router.post('/upload/:id', upload.single("file"), processosController.uploadProcesso);

// Sincronizar com Diario Oficial
router.post('/getDiarioOficial', async (req, res) => {
  try {
    const formData = req.body;
    
    const response = await axios.post('https://www.spdo.ms.gov.br/DiarioDOE/Index/Index/1', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': 'https://www.spdo.ms.gov.br',
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
