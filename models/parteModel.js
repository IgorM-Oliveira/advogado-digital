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
            return false;
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM partes WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            return false;
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
            return false;
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { tipo, nome, contato, email, processo_id } = dadosAtualizados;
        try {
            await client.query(
                "UPDATE partes SET tipo = $1, nome = $2, contato = $3, email = $4, processo_id = $5 WHERE id = $6 RETURNING *",
                [tipo, nome, contato, email, processo_id, id]
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    static async excluir(id) {
        try {
            return await client.query("DELETE FROM partes WHERE id = $1 RETURNING *", [id]);
        } catch (error) {
            return false;
        }
    }
}

module.exports = Parte;
