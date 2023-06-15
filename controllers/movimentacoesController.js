const Movimentacao = require("../models/movimentacaoModel");

// Listar todas as movimentações
exports.listarMovimentacoes = async (req, res) => {
    try {
        const movimentacoes = await Movimentacao.listarTodos();
        res.json(movimentacoes);
    } catch (error) {
        console.error("Falha ao buscar as movimentações:", error);
        res.status(500).json({ error: "Falha ao buscar as movimentações" });
    }
};

// Obter uma movimentação pelo ID
exports.obterMovimentacao = async (req, res) => {
    const { id } = req.params;
    try {
        const movimentacao = await Movimentacao.obterPorId(id);
        res.json(movimentacao);
    } catch (error) {
        console.error("Falha ao obter a movimentação:", error);
        res.status(500).json({ error: "Falha ao obter a movimentação" });
    }
};

// Criar uma nova movimentação
exports.criarMovimentacao = async (req, res) => {
    const { codigo, instancia, tipo, local_mov, status, processo_id } = req.body;
    const novaMovimentacao = { codigo, instancia, tipo, local_mov, status, processo_id };
    try {
        const movimentacaoCriada = await Movimentacao.criar(novaMovimentacao);
        res.status(201).json(movimentacaoCriada);
    } catch (error) {
        console.error("Falha ao criar a movimentação:", error);
        res.status(500).json({ error: "Falha ao criar a movimentação" });
    }
};

// Atualizar uma movimentação
exports.atualizarMovimentacao = async (req, res) => {
    const { id } = req.params;
    const { codigo, instancia, tipo, local_mov, status, processo_id } = req.body;
    const dadosAtualizados = { codigo, instancia, tipo, local_mov, status, processo_id };
    try {
        const movimentacaoAtualizada = await Movimentacao.atualizar(id, dadosAtualizados);
        res.json(movimentacaoAtualizada);
    } catch (error) {
        console.error("Falha ao atualizar a movimentação:", error);
        res.status(500).json({ error: "Falha ao atualizar a movimentação" });
    }
};

// Excluir uma movimentação
exports.excluirMovimentacao = async (req, res) => {
    const { id } = req.params;
    try {
        const movimentacaoExcluida = await Movimentacao.excluir(id);
        res.json(movimentacaoExcluida);
    } catch (error) {
        console.error("Falha ao excluir a movimentação:", error);
        res.status(500).json({ error: "Falha ao excluir a movimentação" });
    }
};
