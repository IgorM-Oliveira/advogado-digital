const { client } = require("../config/db");

class Parte {
    constructor(id, tipo, nome, contato, email, processo_id) {
        this.id = id;
        this.tipo = tipo;
        this.nome = nome;
        this.contato = contato;
        this.email = email;
        this.processo_id = processo_id;
    }

    static async listarTodos() {
        try {
            const results = await client.query("SELECT * FROM partes");
            return results.rows;
        } catch (error) {
            console.error("Falha ao buscar as partes:", error);
            throw new Error("Falha ao buscar as partes");
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM partes WHERE id = $1", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Parte não encontrada");
            }
        } catch (error) {
            console.error("Falha ao obter a parte:", error);
            throw new Error("Falha ao obter a parte");
        }
    }

    static async criar(novaParte) {
        const { tipo, nome, contato, email, processo_id } = novaParte;
        try {
            const result = await client.query(
                "INSERT INTO partes (tipo, nome, contato, email, processo_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [tipo, nome, contato, email, processo_id]
            );
            return result.rows[0];
        } catch (error) {
            console.error("Falha ao criar a parte:", error);
            throw new Error("Falha ao criar a parte");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { tipo, nome, contato, email, processo_id } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE partes SET tipo = $1, nome = $2, contato = $3, email = $4, processo_id = $5 WHERE id = $6 RETURNING *",
                [tipo, nome, contato, email, processo_id, id]
            );
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Parte não encontrada");
            }
        } catch (error) {
            console.error("Falha ao atualizar a parte:", error);
            throw new Error("Falha ao atualizar a parte");
        }
    }

    static async excluir(id) {
        try {
            const result = await client.query("DELETE FROM partes WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Parte não encontrada");
            }
        } catch (error) {
            console.error("Falha ao excluir a parte:", error);
            throw new Error("Falha ao excluir a parte");
        }
    }
}

module.exports = Parte;
