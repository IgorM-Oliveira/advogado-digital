const { client } = require("../config/db");

class Advogado {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }

    static async listarTodos() {
        try {
            const results = await client.query("SELECT * FROM advogados");
            return results.rows;
        } catch (error) {
            console.error("Falha ao buscar os advogados:", error);
            throw new Error("Falha ao buscar os advogados");
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM advogados WHERE id = $1", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Advogado não encontrado");
            }
        } catch (error) {
            console.error("Falha ao obter o advogado:", error);
            throw new Error("Falha ao obter o advogado");
        }
    }

    static async criar(novoAdvogado) {
        const { nome, email } = novoAdvogado;
        try {
            const result = await client.query("INSERT INTO advogados (nome, email) VALUES ($1, $2) RETURNING *", [
                nome,
                email,
            ]);
            return result.rows[0];
        } catch (error) {
            console.error("Falha ao criar o advogado:", error);
            throw new Error("Falha ao criar o advogado");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { nome, email } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE advogados SET nome = $1, email = $2 WHERE id = $3 RETURNING *",
                [nome, email, id]
            );
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Advogado não encontrado");
            }
        } catch (error) {
            console.error("Falha ao atualizar o advogado:", error);
            throw new Error("Falha ao atualizar o advogado");
        }
    }

    static async excluir(id) {
        try {
            const result = await client.query("DELETE FROM advogados WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Advogado não encontrado");
            }
        } catch (error) {
            console.error("Falha ao excluir o advogado:", error);
            throw new Error("Falha ao excluir o advogado");
        }
    }
}

module.exports = Advogado;
