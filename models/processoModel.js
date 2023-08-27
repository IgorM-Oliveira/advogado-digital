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
            return false;
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM processos WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            return false;
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
            return false;
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { numero, comanda, tipo } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE processos SET numero = $1, comanda = $2, tipo = $3 WHERE id = $4 RETURNING *",
                [numero, comanda, tipo, id]
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    static async excluir(id) {
        try {
            return await client.query("DELETE FROM processos WHERE id = $1 RETURNING *", [id]);
        } catch (error) {
            return false;
        }
    }
}

module.exports = Processo;
