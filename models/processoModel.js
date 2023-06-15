const { client } = require("../config/db");

class Processo {
    constructor(id, numero, comanda, tipo) {
        this.id = id;
        this.numero = numero;
        this.comanda = comanda;
        this.tipo = tipo;
    }

    static async listarTodos() {
        try {
            const results = await client.query("SELECT * FROM processos");
            return results.rows;
        } catch (error) {
            console.error("Falha ao buscar os processos:", error);
            throw new Error("Falha ao buscar os processos");
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM processos WHERE id = $1", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Processo não encontrado");
            }
        } catch (error) {
            console.error("Falha ao obter o processo:", error);
            throw new Error("Falha ao obter o processo");
        }
    }

    static async criar(novoProcesso) {
        const { numero, comanda, tipo } = novoProcesso;
        try {
            const result = await client.query(
                "INSERT INTO processos (numero, comanda, tipo) VALUES ($1, $2, $3) RETURNING *",
                [numero, comanda, tipo]
            );
            return result.rows[0];
        } catch (error) {
            console.error("Falha ao criar o processo:", error);
            throw new Error("Falha ao criar o processo");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { numero, comanda, tipo } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE processos SET numero = $1, comanda = $2, tipo = $3 WHERE id = $4 RETURNING *",
                [numero, comanda, tipo, id]
            );
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Processo não encontrado");
            }
        } catch (error) {
            console.error("Falha ao atualizar o processo:", error);
            throw new Error("Falha ao atualizar o processo");
        }
    }

    static async excluir(id) {
        try {
            const result = await client.query("DELETE FROM processos WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                throw new Error("Processo não encontrado");
            }
        } catch (error) {
            console.error("Falha ao excluir o processo:", error);
            throw new Error("Falha ao excluir o processo");
        }
    }
}

module.exports = Processo;
