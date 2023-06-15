const Cliente = require("../models/clienteModel");

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.listarTodos();
        res.json(clientes);
    } catch (error) {
        console.error("Falha ao buscar os clientes:", error);
        res.status(500).json({ error: "Falha ao buscar os clientes" });
    }
};

// Obter um cliente pelo ID
exports.obterCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.obterPorId(id);
        res.json(cliente);
    } catch (error) {
        console.error("Falha ao obter o cliente:", error);
        res.status(500).json({ error: "Falha ao obter o cliente" });
    }
};

// Criar um novo cliente
exports.criarCliente = async (req, res) => {
    const { nome, email } = req.body;
    const novoCliente = { nome, email };
    try {
        const clienteCriado = await Cliente.criar(novoCliente);
        res.status(201).json(clienteCriado);
    } catch (error) {
        console.error("Falha ao criar o cliente:", error);
        res.status(500).json({ error: "Falha ao criar o cliente" });
    }
};

// Atualizar um cliente
exports.atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const dadosAtualizados = { nome, email };
    try {
        const clienteAtualizado = await Cliente.atualizar(id, dadosAtualizados);
        res.json(clienteAtualizado);
    } catch (error) {
        console.error("Falha ao atualizar o cliente:", error);
        res.status(500).json({ error: "Falha ao atualizar o cliente" });
    }
};

// Excluir um cliente
exports.excluirCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteExcluido = await Cliente.excluir(id);
        res.json(clienteExcluido);
    } catch (error) {
        console.error("Falha ao excluir o cliente:", error);
        res.status(500).json({ error: "Falha ao excluir o cliente" });
    }
};
