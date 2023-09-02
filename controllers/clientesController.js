const Cliente = require("../models/clienteModel");

// Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.listarTodos();
        res.json(clientes);
    } catch (error) {
        res.status(403).json({ error: "Falha ao buscar os clientes" });
    }
};

// Listar todos os clientes vinculados
exports.listarClientesVinculados = async (req, res) => {
    const { id } = req.params;
    try {
        const clientes = await Cliente.listarTodosVinculados(id);
        res.json(clientes);
    } catch (error) {
        res.status(403).json({ error: "Falha ao buscar os clientes" });
    }
};

// Obter um cliente pelo ID
exports.obterCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.obterPorId(id);
        res.json(cliente);
    } catch (error) {
        res.status(403).json({ error: "Falha ao obter o cliente" });
    }
};

// Criar um novo cliente
exports.criarCliente = async (req, res) => {
    const novoCliente = req.body;
    try {
        const clienteCriado = await Cliente.criar(novoCliente);

        if (clienteCriado) {
            res.status(201).json(clienteCriado);
        } else {
            res.status(500).json({ error: "Falha ao criar o cliente" });
        }
    } catch (error) {
        res.status(500).json({ error: "Falha ao criar o cliente" });
    }
};

// Atualizar um cliente
exports.atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const dadosAtualizados = req.body;
    try {
        const clienteAtualizado = await Cliente.atualizar(id, dadosAtualizados);

        if (clienteAtualizado) {
            res.status(201).json({ response: "Atualização executada" });
        } else {
            res.status(401).json({ response: 'Erro encontrado na atualização' });
        }
    } catch (error) {
        res.status(403).json({ error: "Falha ao atualizar o cliente" });
    }
};

// Excluir um cliente
exports.excluirCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const clienteExcluido = await Cliente.excluir(id);
        res.json(clienteExcluido);
    } catch (error) {
        res.status(403).json({ error: "Falha ao excluir o cliente" });
    }
};
