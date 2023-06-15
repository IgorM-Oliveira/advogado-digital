const Parte = require("../models/parteModel");

// Listar todas as partes
exports.listarPartes = async (req, res) => {
    try {
        const partes = await Parte.listarTodos();
        res.json(partes);
    } catch (error) {
        console.error("Falha ao buscar as partes:", error);
        res.status(500).json({ error: "Falha ao buscar as partes" });
    }
};

// Obter uma parte pelo ID
exports.obterParte = async (req, res) => {
    const { id } = req.params;
    try {
        const parte = await Parte.obterPorId(id);
        res.json(parte);
    } catch (error) {
        console.error("Falha ao obter a parte:", error);
        res.status(500).json({ error: "Falha ao obter a parte" });
    }
};

// Criar uma nova parte
exports.criarParte = async (req, res) => {
    const { tipo, nome, contato, email } = req.body;
    const novaParte = { tipo, nome, contato, email };
    try {
        const parteCriada = await Parte.criar(novaParte);
        res.status(201).json(parteCriada);
    } catch (error) {
        console.error("Falha ao criar a parte:", error);
        res.status(500).json({ error: "Falha ao criar a parte" });
    }
};

// Atualizar uma parte
exports.atualizarParte = async (req, res) => {
    const { id } = req.params;
    const { tipo, nome, contato, email } = req.body;
    const dadosAtualizados = { tipo, nome, contato, email };
    try {
        const parteAtualizada = await Parte.atualizar(id, dadosAtualizados);
        res.json(parteAtualizada);
    } catch (error) {
        console.error("Falha ao atualizar a parte:", error);
        res.status(500).json({ error: "Falha ao atualizar a parte" });
    }
};

// Excluir uma parte
exports.excluirParte = async (req, res) => {
    const { id } = req.params;
    try {
        const parteExcluida = await Parte.excluir(id);
        res.json(parteExcluida);
    } catch (error) {
        console.error("Falha ao excluir a parte:", error);
        res.status(500).json({ error: "Falha ao excluir a parte" });
    }
};
