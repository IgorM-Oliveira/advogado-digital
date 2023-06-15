const Processo = require("../models/processoModel");

// Listar todos os processos
exports.listarProcessos = async (req, res) => {
    try {
        const processos = await Processo.listarTodos();
        res.json(processos);
    } catch (error) {
        console.error("Falha ao buscar os processos:", error);
        res.status(500).json({ error: "Falha ao buscar os processos" });
    }
};

// Obter um processo pelo ID
exports.obterProcesso = async (req, res) => {
    const { id } = req.params;
    try {
        const processo = await Processo.obterPorId(id);
        res.json(processo);
    } catch (error) {
        console.error("Falha ao obter o processo:", error);
        res.status(500).json({ error: "Falha ao obter o processo" });
    }
};

// Criar um novo processo
exports.criarProcesso = async (req, res) => {
    const { numero, comanda, tipo } = req.body;
    const novoProcesso = { numero, comanda, tipo };
    try {
        const processoCriado = await Processo.criar(novoProcesso);
        res.status(201).json(processoCriado);
    } catch (error) {
        console.error("Falha ao criar o processo:", error);
        res.status(500).json({ error: "Falha ao criar o processo" });
    }
};

// Atualizar um processo
exports.atualizarProcesso = async (req, res) => {
    const { id } = req.params;
    const { numero, comanda, tipo } = req.body;
    const dadosAtualizados = { numero, comanda, tipo };
    try {
        const processoAtualizado = await Processo.atualizar(id, dadosAtualizados);
        res.json(processoAtualizado);
    } catch (error) {
        console.error("Falha ao atualizar o processo:", error);
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
        console.error("Falha ao excluir o processo:", error);
        res.status(500).json({ error: "Falha ao excluir o processo" });
    }
};
