const { client } = require("../config/db");

class Cliente {
    constructor(id, id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, dataNasc, tipo, processo_id) {
        this.id = id;
        this.id_estado = id_estado;
        this.id_cidade = id_cidade;
        this.nome = nome;
        this.contato = contato;
        this.logradouro = logradouro;
        this.endereco = endereco;
        this.numberEnde = numberEnde;
        this.dataNasc = dataNasc;
        this.tipo = tipo;
        this.processo_id = processo_id;
    }

    static async listarTodos() {
        try {
            const results = await client.query("SELECT * FROM clientes");
            return results.rows;
        } catch (error) {
            console.error("Falha ao buscar os clientes:", error);
            throw new Error("Falha ao buscar os clientes");
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM clientes WHERE id = $1", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Cliente não encontrado");
            }
        } catch (error) {
            console.error("Falha ao obter o cliente:", error);
            throw new Error("Falha ao obter o cliente");
        }
    }

    static async criar(novoCliente) {
        const { id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, dataNasc, tipo, processo_id } = novoCliente;
        try {
            const result = await client.query(
                "INSERT INTO clientes (id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, dataNasc, tipo, processo_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
                [id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, dataNasc, tipo, processo_id]
            );
            return result.rows[0];
        } catch (error) {
            console.error("Falha ao criar o cliente:", error);
            throw new Error("Falha ao criar o cliente");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, dataNasc, tipo, processo_id } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE clientes SET id_estado = $1, id_cidade = $2, nome = $3, contato = $4, logradouro = $5, endereco = $6, numberEnde = $7, dataNasc = $8, tipo = $9, processo_id = $10 WHERE id = $11 RETURNING *",
                [id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, dataNasc, tipo, processo_id, id]
            );
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Cliente não encontrado");
            }
        } catch (error) {
            console.error("Falha ao atualizar o cliente:", error);
            throw new Error("Falha ao atualizar o cliente");
        }
    }

    static async excluir(id) {
        try {
            const result = await client.query("DELETE FROM clientes WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Cliente não encontrado");
            }
        } catch (error) {
            console.error("Falha ao excluir o cliente:", error);
            throw new Error("Falha ao excluir o cliente");
        }
    }
}

module.exports = Cliente;
