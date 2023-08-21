const { client } = require("../config/db");

class Advogado {
    constructor(id, id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, numAdv, senha, estadLogin, dataCadastro, areas, processo_id) {
        this.id = id;
        this.id_estado = id_estado;
        this.id_cidade = id_cidade;
        this.nome = nome;
        this.contato = contato;
        this.logradouro = logradouro;
        this.endereco = endereco;
        this.numberEnde = numberEnde;
        this.numAdv = numAdv;
        this.senha = senha;
        this.estadLogin = estadLogin;
        this.dataCadastro = dataCadastro;
        this.areas = areas;
        this.processo_id = processo_id;
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
        const { id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, numAdv, senha, estadLogin, dataCadastro, areas, processo_id } = novoAdvogado;
        try {
            const result = await client.query(
                "INSERT INTO advogados (id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, numAdv, senha, estadLogin, dataCadastro, areas, processo_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
                [id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, numAdv, senha, estadLogin, dataCadastro, areas, processo_id]
            );
            return result.rows[0];
        } catch (error) {
            console.error("Falha ao criar o advogado:", error);
            throw new Error("Falha ao criar o advogado");
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, numAdv, senha, estadLogin, dataCadastro, areas, processo_id } = dadosAtualizados;
        try {
            const result = await client.query(
                "UPDATE advogados SET id_estado = $1, id_cidade = $2, nome = $3, contato = $4, logradouro = $5, endereco = $6, numberEnde = $7, numAdv = $8, senha = $9, estadLogin = $10, dataCadastro = $11, areas = $12, processo_id = $13 WHERE id = $14 RETURNING *",
                [id_estado, id_cidade, nome, contato, logradouro, endereco, numberEnde, numAdv, senha, estadLogin, dataCadastro, areas, processo_id, id]
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

    static async buscarPorNumeroEsenha(numAdv, senha) {
        try {
            const result = await client.query('SELECT * FROM advogados WHERE numAdv like $1 AND senha like $2', [numAdv, senha]);

            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Erro ao buscar advogado:', error);
            throw new Error('Erro ao buscar advogado');
        }
    }
}

module.exports = Advogado;
