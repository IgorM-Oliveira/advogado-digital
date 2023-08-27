const Advogado = require("../models/advogadoModel");

// Listar todos os advogados
exports.listarAdvogados = async (req, res) => {
    try {
        const advogados = await Advogado.listarTodos();
        res.json(advogados);
    } catch (error) {
        res.status(403).json({ error: "Falha ao buscar os advogados" });
    }
};

// Obter um advogado pelo ID
exports.obterAdvogado = async (req, res) => {
    const { id } = req.params;
    try {
        const advogado = await Advogado.obterPorId(id);
        res.json(advogado);
    } catch (error) {
        res.status(403).json({ error: "Falha ao obter o advogado" });
    }
};

// Criar um novo advogado
exports.criarAdvogado = async (req, res) => {
    const novoAdvogado = req.body;
    try {
        const advogadoCriado = await Advogado.criar(novoAdvogado);
        res.status(201).json(advogadoCriado);
    } catch (error) {
        res.status(403).json({ error: "Falha ao criar o advogado" });
    }
};

// Atualizar um advogado
exports.atualizarAdvogado = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
        const advogadoAtualizado = await Advogado.atualizar(id, dadosAtualizados);

            if (advogadoAtualizado) {
                res.status(201).json({ response: "Atualização executada" });
            } else {
                res.status(401).json({ response: 'Erro encontrado na atualização' });
            }
    } catch (error) {
        res.status(403).json({ error: "Falha ao atualizar o advogado" });
    }
};

// Excluir um advogado
exports.excluirAdvogado = async (req, res) => {
    const { id } = req.params;
    try {
        const advogadoExcluido = await Advogado.excluir(id);
        res.json(advogadoExcluido);
    } catch (error) {
        res.status(403).json({ error: "Falha ao excluir o advogado" });
    }
};
