const path = require("path");
const fs = require("fs");

const Processo = require("../models/processoModel");

// Listar todos os processos
exports.listarProcessos = async (req, res) => {
    try {
        const processos = await Processo.listarTodos();
        res.json(processos);
    } catch (error) {
        res.status(500).json({ error: "Falha ao buscar os processos" });
    }
};

// Listar todos os processos vinculados
exports.listarProcessosVinculados = async (req, res) => {
    const { id } = req.params;
    try {
        const processos = await Processo.listarTodosVinculados(id);
        res.json(processos);
    } catch (error) {
        res.status(500).json({ error: "Falha ao buscar os processos vinculados" });
    }
};

// Listar todos os processos vinculados ao cliente
exports.listarProcessosClienteVinculados = async (req, res) => {
    const { id } = req.params;
    try {
        const processos = await Processo.listarTodosVinculadosCliente(id);
        res.json(processos);
    } catch (error) {
        res.status(500).json({ error: "Falha ao buscar os processos vinculados ao cliente" });
    }
};

// Listar todos os tipos de processos
exports.listarTiposProcessos = async (req, res) => {
    try {
        const processos = await Processo.listarTodosTipos();
        res.json(processos);
    } catch (error) {
        res.status(500).json({ error: "Falha ao buscar os tipos de processos" });
    }
};

// Obter um processo pelo ID
exports.obterProcesso = async (req, res) => {
    const { id } = req.params;
    try {
        const processo = await Processo.obterPorId(id);
        res.json(processo);
    } catch (error) {
        res.status(500).json({ error: "Falha ao obter o processo" });
    }
};

// Criar um novo processo
exports.criarProcesso = async (req, res) => {
    const novoProcesso = req.body;
    try {
        const processoCriado = await Processo.criar(novoProcesso);
        res.status(201).json(processoCriado);
    } catch (error) {
        res.status(500).json({ error: "Falha ao criar o processo" });
    }
};

// Atualizar um processo
exports.atualizarProcesso = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
        const processoAtualizado = await Processo.atualizar(id, dadosAtualizados);
        res.json(processoAtualizado);
    } catch (error) {
        res.status(500).json({ error: "Falha ao atualizar o processo" });
    }
};

// Excluir um processo
exports.excluirProcesso = async (req, res) => {
    const { id } = req.params;
    try {
        const processoExcluido = await Processo.excluir(id);
        res.json(processoExcluido);
    } catch (error) {
        res.status(500).json({ error: "Falha ao excluir o processo" });
    }
};

// Criar um nova relação
exports.uploadProcessoInsert = async (req, res) => {
    const relations = req.body;
    try {
        const processoRelations = await Processo.insertRelations(relations);
        res.status(201).json(processoRelations);
    } catch (error) {
        res.status(500).json({ error: "Falha ao criar o processo" });
    }
};

// Remover uma relação
exports.uploadProcessoRemove = async (req, res) => {
    const relations = req.body;
    try {
        const processoRelations = await Processo.removeRelations(relations);
        res.status(201).json(processoRelations);
    } catch (error) {
        res.status(500).json({ error: "Falha ao criar o processo" });
    }
};

// Atualizar uma relação
exports.uploadProcesso = async (req, res) => {
    const { id } = req.params;
    const arquivoPDF = req.file;

    try {
        // Verifica se o arquivo foi enviado
        if (!arquivoPDF) {
            return res.status(400).json({ error: "Nenhum arquivo foi enviado." });
        }

        // Move o arquivo para o diretório adequado (por exemplo, uploads/pdfs)
        const pastaUploads = path.join(__dirname, "../uploads/pdfs");
        if (!fs.existsSync(pastaUploads)) {
            fs.mkdirSync(pastaUploads, { recursive: true });
        }

        const caminhoArquivo = path.join(pastaUploads, arquivoPDF.filename);
        fs.renameSync(arquivoPDF.path, caminhoArquivo);

        // Atualiza o processo no banco de dados com o caminho do arquivo PDF
        const processoAtualizado = await Processo.vincularArquivoPDF(id, caminhoArquivo, arquivoPDF.originalname);

        if (processoAtualizado) {
            return res.status(200).json({ message: "Arquivo PDF vinculado com sucesso ao processo." });
        } else {
            return res.status(500).json({ error: "Falha ao vincular o arquivo PDF ao processo." });
        }
    } catch (error) {
        res.status(500).json({ error: "Falha ao vincular o arquivo PDF ao processo: " + error.message });
    }
};
