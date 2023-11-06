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

    static async listarTodosVinculados(id) {
        try {
            const results = await client.query("select p.id, p.numero, p.comanda, p.tipo from public.processos p join vinculovp vp on p.id = vp.id_processo join vinculoac ac on vp.id_vinculo = ac.id join advogados a on ac.id_advogado = a.id where a.id = $1 group by p.id, p.numero, p.comanda, p.tipo", [id]);
            const resultsCliente = await client.query("select ac.id_cliente cliente from public.processos p join vinculovp vp on p.id = vp.id_processo join vinculoac ac on vp.id_vinculo = ac.id join advogados a on ac.id_advogado = a.id where a.id = $1 group by ac.id_cliente", [id]);

            let cliente = []

            resultsCliente.rows.forEach(item => {
                cliente.push(item.cliente)
            })

            results.rows[0].cliente = cliente

            return results.rows;
        } catch (error) {
            return false;
        }
    }

    static async listarTodosTipos() {
        try {
            const results = await client.query("SELECT * FROM tipo_processo");
            return results.rows;
        } catch (error) {
            return false;
        }
    }

    static async obterPorId(id) {
        try {
            const result = await client.query("SELECT * FROM processos WHERE id = $1", [id]);
            const resultCliente = await client.query("select ac.id cliente from public.processos p join vinculovp vp on p.id = vp.id_processo join vinculoac ac on vp.id_vinculo = ac.id join advogados a on ac.id_advogado = a.id where p.id = $1 group by ac.id", [id]);
            const resultUpload = await client.query("select id, id_processo, caminho_pdf, filename from public.procupload p where id_processo = $1", [id]);

            const cliente = []
            const file = []

            resultCliente.rows.forEach(item => {
                cliente.push(Number(item.cliente))
            })

            resultUpload.rows.forEach(item => {
                file.push({
                    id: item.id,
                    name: item.filename,
                    url: item.caminho_pdf,
                    thumbUrl: item.caminho_pdf,
                })
            })

            result.rows[0].cliente = cliente
            result.rows[0].files = file

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

            for (const item of novoProcesso.clientes_vinculados) {
                await client.query(
                    "INSERT INTO public.vinculovp (id_vinculo, id_processo) VALUES ($1, $2) RETURNING *",
                    [item, result.rows[0].id]
                );
            }

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

    static async removeRelations(data) {
        try {
            let result = null;
            for (const relation of data) {
                result = await client.query("DELETE FROM procupload WHERE id = $1 RETURNING *", [relation.id]);
            }
            return result
        } catch (error) {
            return false;
        }
    }

    static async vincularArquivoPDF(id, caminhoArquivo, name) {
        try {
            const result = await client.query(
                "INSERT INTO procupload (id_processo, caminho_pdf, filename) VALUES ($1, $2, $3) RETURNING *",
                [id, caminhoArquivo, name]
            );

            if (result.rows.length > 0) {
                return result.rows[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = Processo;
