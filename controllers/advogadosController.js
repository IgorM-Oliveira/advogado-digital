const Advogado = require("../models/advogadoModel");

// Listar todos os advogados
exports.listarAdvogados = async (req, res) => {
    try {
        const advogados = await Advogado.listarTodos();
        res.json(advogados);
    } catch (error) {
        console.error("Falha ao buscar os advogados:", error);
        res.status(500).json({ error: "Falha ao buscar os advogados" });
    }
};

// Obter um advogado pelo ID
exports.obterAdvogado = async (req, res) => {
    const { id } = req.params;
    try {
        const advogado = await Advogado.obterPorId(id);
        res.json(advogado);
    } catch (error) {
        console.error("Falha ao obter o advogado:", error);
        res.status(500).json({ error: "Falha ao obter o advogado" });
    }
};

// Criar um novo advogado
exports.criarAdvogado = async (req, res) => {
    const { nome, email } = req.body;
    const novoAdvogado = { nome, email };
    try {
        const advogadoCriado = await Advogado.criar(novoAdvogado);
        res.status(201).json(advogadoCriado);
    } catch (error) {
        console.error("Falha ao criar o advogado:", error);
        res.status(500).json({ error: "Falha ao criar o advogado" });
    }
};

// Atualizar um advogado
exports.atualizarAdvogado = async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const dadosAtualizados = { nome, email };
    try {
        const advogadoAtualizado = await Advogado.atualizar(id, dadosAtualizados);
        res.json(advogadoAtualizado);
    } catch (error) {
        console.error("Falha ao atualizar o advogado:", error);
        res.status(500).json({ error: "Falha ao atualizar o advogado" });
    }
};

// Excluir um advogado
exports.excluirAdvogado = async (req, res) => {
    const { id } = req.params;
    try {
        const advogadoExcluido = await Advogado.excluir(id);
        res.json(advogadoExcluido);
    } catch (error) {
        console.error("Falha ao excluir o advogado:", error);
        res.status(500).json({ error: "Falha ao excluir o advogado" });
    }
};
