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
            return false;
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM advogados WHERE id = $1", [id]);
            return result.rows[0];
        } catch (error) {
            return false;
        }
    }

    static async criar(novoAdvogado) {
        const { nome, cpf, data_nasc, sexo, emial, cep, bairro, complemento, cidade, contato, logradouro, endereco, numberende, numadv, senha, estadlogin, datacadastro, areas } = novoAdvogado;
        try {
            const result = await client.query(
                "INSERT INTO advogados (nome, cpf, data_nasc, sexo, emial, cep, bairro, complemento, cidade, contato, logradouro, endereco, numberende, numadv, senha, estadlogin, datacadastro, areas) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *",
                [nome, cpf, data_nasc, sexo, emial, cep, bairro, complemento, cidade, contato, logradouro, endereco, numberende, numadv, senha, estadlogin, datacadastro, areas]
            );
            return result.rows[0];
        } catch (error) {
            return false;
        }
    }

    static async atualizar(id, dadosAtualizados) {
        const { id_estado, id_cidade, nome, cpf, data_nasc, sexo, emial, cep, bairro, complemento, cidade, contato, logradouro, endereco, numberende, numadv, senha, estadlogin, datacadastro, areas } = dadosAtualizados;

        try {
            await client.query(
                "UPDATE public.advogados SET id_estado=$2, id_cidade=$3, nome=$4, cpf=$5, data_nasc=$6, sexo=$7, emial=$8, cep=$9, bairro=$10, complemento=$11, cidade=$12, contato=$13, logradouro=$14, endereco=$15, numberende=$16, numadv=$17, senha=$18, estadlogin=$19, datacadastro=$20, areas=$21 WHERE id=$1",
                [id, id_estado, id_cidade, nome, cpf, data_nasc, sexo, emial, cep, bairro, complemento, cidade, contato, logradouro, endereco, numberende, numadv, senha, estadlogin, datacadastro, areas]
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    static async excluir(id) {
        try {
            const result = await client.query("DELETE FROM advogados WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                console.error("Advogado não encontrado");
            }
        } catch (error) {
            return false;
        }
    }

    static async authLogin(cpf, senha) {
        try {
            const result = await client.query('SELECT * FROM advogados WHERE cpf like $1 AND senha like $2', [cpf, senha]);

            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            return false;
        }
    }
}

module.exports = Advogado;
