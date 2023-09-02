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
