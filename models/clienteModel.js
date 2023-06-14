const { client } = require("../config/db");

class Cliente {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
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
                throw new Error("Advogado não encontrado");
            }
        } catch (error) {
            console.error("Falha ao obter o cliente:", error);
            throw new Error("Falha ao obter o cliente");
        }
    }

    static async criar(novoAdvogado) {
        const { nome, email } = novoAdvogado;
        try {
            const result = await client.query("INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *", [
                nome,
                email,
            ]);
            return result.rows[0];
        } catch (error) {
            console.error("Falha ao criar o cliente:", error);
            throw new Error("Falha ao criar o cliente");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { nome, email } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE clientes SET nome = $1, email = $2 WHERE id = $3 RETURNING *",
                [nome, email, id]
            );
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Advogado não encontrado");
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
                throw new Error("Advogado não encontrado");
            }
        } catch (error) {
            console.error("Falha ao excluir o cliente:", error);
            throw new Error("Falha ao excluir o cliente");
        }
    }
}

module.exports = Cliente;
