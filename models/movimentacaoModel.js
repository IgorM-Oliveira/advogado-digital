const { client } = require("../config/db");

class Movimentacao {
    constructor(id, codigo, instancia, tipo, local_mov, status, processo_id) {
        this.id = id;
        this.codigo = codigo;
        this.instancia = instancia;
        this.tipo = tipo;
        this.local_mov = local_mov;
        this.status = status;
        this.processo_id = processo_id;
    }

    static async listarTodos() {
        try {
            const results = await client.query("SELECT * FROM movimentacoes");
            return results.rows;
        } catch (error) {
            return false;
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM movimentacoes WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            return false;
        }
    }

    static async criar(novaMovimentacao) {
        const { codigo, instancia, tipo, local_mov, status, processo_id } = novaMovimentacao;
        try {
            const result = await client.query(
                "INSERT INTO movimentacoes (codigo, instancia, tipo, local_mov, status, processo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [codigo, instancia, tipo, local_mov, status, processo_id]
            );
            return result.rows[0];
        } catch (error) {
            return false;
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { codigo, instancia, tipo, local_mov, status, processo_id } = dadosAtualizados;
        try {
            await client.query(
                "UPDATE movimentacoes SET codigo = $1, instancia = $2, tipo = $3, local_mov = $4, status = $5, processo_id = $6 WHERE id = $7 RETURNING *",
                [codigo, instancia, tipo, local_mov, status, processo_id, id]
            );
            return true
        } catch (error) {
            return false;
        }
    }

    static async excluir(id) {
        try {
            return await client.query("DELETE FROM movimentacoes WHERE id = $1 RETURNING *", [id]);
        } catch (error) {
            return false
        }
    }
}

module.exports = Movimentacao;
