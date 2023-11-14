const Advogado = require("../models/advogadoModel");

// Listar todos os advogados
exports.listarAdvogados = async (req, res) => {
    try {
        const advogados = await Advogado.listarTodos();
        res.json(advogados);
    } catch (error) {
        res.status(500).json({ error: `Falha ao buscar os advogados: ${error.message}` });
    }
};

// Obter um advogado pelo ID
exports.obterAdvogado = async (req, res) => {
    const { id } = req.params;
    try {
        const advogado = await Advogado.obterPorId(id);
        res.json(advogado);
    } catch (error) {
        res.status(500).json({ error: `Falha ao obter o advogado: ${error.message}` });
    }
};

// Criar um novo advogado
exports.criarAdvogado = async (req, res) => {
    const novoAdvogado = req.body;
    try {
        const advogadoCriado = await Advogado.criar(novoAdvogado);
        res.status(201).json(advogadoCriado);
    } catch (error) {
        res.status(500).json({ error: `Falha ao criar o advogado: ${error.message}` });
    }
};

// Atualizar um advogado
exports.atualizarAdvogado = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
        const advogadoAtualizado = await Advogado.atualizar(id, dadosAtualizados);
        if (advogadoAtualizado) {
            res.status(200).json({ response: "Advogado atualizado com sucesso" });
        } else {
            res.status(404).json({ error: 'Advogado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Falha ao atualizar o advogado: ${error.message}` });
    }
};

// Excluir um advogado
exports.excluirAdvogado = async (req, res) => {
    const { id } = req.params;
    try {
        const advogadoExcluido = await Advogado.excluir(id);
        if (advogadoExcluido) {
            res.status(200).json({ response: "Advogado excluído com sucesso" });
        } else {
            res.status(404).json({ error: 'Advogado não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: `Falha ao excluir o advogado: ${error.message}` });
    }
};
