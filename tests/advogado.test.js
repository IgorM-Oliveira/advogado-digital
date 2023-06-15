const Advogado = require("../models/advogadoModel");
const { client } = require("../config/db");

describe("Advogado", () => {
    beforeAll(async () => {
        // Antes de executar os testes, conecte-se ao banco de dados
        await client.connect();
    });

    afterAll(async () => {
        // Após executar os testes, desconecte-se do banco de dados
        await client.end();
    });

    beforeEach(async () => {
        // Antes de cada teste, limpe a tabela de advogados
        await client.query("DELETE FROM advogados");
    });

    test("Deve retornar a lista de advogados corretamente", async () => {
        // Insira alguns advogados de teste no banco de dados
        await client.query(
            "INSERT INTO advogados (nome, contato) VALUES ($1, $2)",
            ["Advogado 1", 123456789]
        );
        await client.query(
            "INSERT INTO advogados (nome, contato) VALUES ($1, $2)",
            ["Advogado 2", 987654321]
        );

        // Chame o método listarTodos do modelo Advogado
        const advogados = await Advogado.listarTodos();

        // Verifique se a lista de advogados retornada é a esperada
        expect(advogados.length).toBe(2);
        expect(advogados[0].nome).toBe("Advogado 1");
        expect(advogados[0].contato).toBe(123456789);
        expect(advogados[1].nome).toBe("Advogado 2");
        expect(advogados[1].contato).toBe(987654321);
    });

    test("Deve obter um advogado por ID corretamente", async () => {
        // Insira um advogado de teste no banco de dados
        const result = await client.query(
            "INSERT INTO advogados (nome, contato) VALUES ($1, $2) RETURNING *",
            ["Advogado 1", 123456789]
        );
        const { id } = result.rows[0];

        // Chame o método obterPorId do modelo Advogado
        const advogado = await Advogado.obterPorId(id);

        // Verifique se o advogado retornado é o esperado
        expect(advogado.id).toBe(id);
        expect(advogado.nome).toBe("Advogado 1");
        expect(advogado.contato).toBe(123456789);
    });

    test("Deve criar um novo advogado corretamente", async () => {
        const novoAdvogado = {
            nome: "Advogado 1",
            contato: 123456789,
        };

        // Chame o método criar do modelo Advogado
        const advogadoCriado = await Advogado.criar(novoAdvogado);

        // Verifique se o advogado foi criado corretamente
        expect(advogadoCriado.nome).toBe("Advogado 1");
        expect(advogadoCriado.contato).toBe(123456789);

        // Verifique se o advogado está presente no banco de dados
        const result = await client.query("SELECT * FROM advogados WHERE id = $1", [
            advogadoCriado.id,
        ]);
        expect(result.rowCount).toBe(1);
    });

    test("Deve atualizar um advogado corretamente", async () => {
        // Insira um advogado de teste no banco de dados
        const result = await client.query(
            "INSERT INTO advogados (nome, contato) VALUES ($1, $2) RETURNING *",
            ["Advogado 1", 123456789]
        );
        const { id } = result.rows[0];

        const dadosAtualizados = {
            nome: "Advogado 2",
            contato: 987654321,
        };

        // Chame o método atualizar do modelo Advogado
        const advogadoAtualizado = await Advogado.atualizar(id, dadosAtualizados);

        // Verifique se o advogado foi atualizado corretamente
        expect(advogadoAtualizado.id).toBe(id);
        expect(advogadoAtualizado.nome).toBe("Advogado 2");
        expect(advogadoAtualizado.contato).toBe(987654321);
    });

    test("Deve excluir um advogado corretamente", async () => {
        // Insira um advogado de teste no banco de dados
        const result = await client.query(
            "INSERT INTO advogados (nome, contato) VALUES ($1, $2) RETURNING *",
            ["Advogado 1", 123456789]
        );
        const { id } = result.rows[0];

        // Chame o método excluir do modelo Advogado
        await Advogado.excluir(id);

        // Verifique se o advogado foi excluído corretamente (não deve estar mais no banco de dados)
        const result2 = await client.query("SELECT * FROM advogados WHERE id = $1", [
            id,
        ]);
        expect(result2.rowCount).toBe(0);
    });
});
