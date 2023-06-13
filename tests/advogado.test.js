const Advogado = require('../models/advogadoModel');
const { client } = require('../config/db');

describe('Advogado', () => {
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
        await client.query('DELETE FROM advogados');
    });

    test('Deve retornar a lista de advogados corretamente', async () => {
        // Insira alguns advogados de teste no banco de dados
        await client.query('INSERT INTO advogados (nome, email) VALUES ($1, $2)', ['Advogado 1', 'advogado1@example.com']);
        await client.query('INSERT INTO advogados (nome, email) VALUES ($1, $2)', ['Advogado 2', 'advogado2@example.com']);

        // Chame o método listarTodos do modelo Advogado
        const advogados = await Advogado.listarTodos();

        // Verifique se a lista de advogados retornada é a esperada
        expect(advogados.length).toBe(2);
        expect(advogados[0].nome).toBe('Advogado 1');
        expect(advogados[0].email).toBe('advogado1@example.com');
        expect(advogados[1].nome).toBe('Advogado 2');
        expect(advogados[1].email).toBe('advogado2@example.com');
    });

    test('Deve obter um advogado pelo ID corretamente', async () => {
        // Insira um advogado de teste no banco de dados
        const result = await client.query('INSERT INTO advogados (nome, email) VALUES ($1, $2) RETURNING *', ['Advogado 1', 'advogado1@example.com']);
        const { id } = result.rows[0];

        // Chame o método obterPorId do modelo Advogado
        const advogado = await Advogado.obterPorId(id);

        // Verifique se o advogado retornado é o esperado
        expect(advogado.id).toBe(id);
        expect(advogado.nome).toBe('Advogado 1');
        expect(advogado.email).toBe('advogado1@example.com');
    });

    test('Deve criar um novo advogado corretamente', async () => {
        const novoAdvogado = {
            nome: 'Advogado 1',
            email: 'advogado1@example.com',
        };

        // Chame o método criar do modelo Advogado
        const advogadoCriado = await Advogado.criar(novoAdvogado);

        // Verifique se o advogado foi criado corretamente
        expect(advogadoCriado.nome).toBe('Advogado 1');
        expect(advogadoCriado.email).toBe('advogado1@example.com');

        // Verifique se o advogado está presente no banco de dados
        const result = await client.query('SELECT * FROM advogados WHERE id = $1', [advogadoCriado.id]);
        expect(result.rowCount).toBe(1);
    });

    test('Deve atualizar um advogado corretamente', async () => {
        // Insira um advogado de teste no banco de dados
        const result = await client.query('INSERT INTO advogados (nome, email) VALUES ($1, $2) RETURNING *', ['Advogado 1', 'advogado1@example.com']);
        const { id } = result.rows[0];

        const dadosAtualizados = {
            nome: 'Advogado Atualizado',
            email: 'advogado_atualizado@example.com',
        };

        // Chame o método atualizar do modelo Advogado
        const advogadoAtualizado = await Advogado.atualizar(id, dadosAtualizados);

        // Verifique se o advogado foi atualizado corretamente
        expect(advogadoAtualizado.id).toBe(id);
        expect(advogadoAtualizado.nome).toBe('Advogado Atualizado');
        expect(advogadoAtualizado.email).toBe('advogado_atualizado@example.com');
    });

    test('Deve excluir um advogado corretamente', async () => {
        // Insira um advogado de teste no banco de dados
        const result = await client.query('INSERT INTO advogados (nome, email) VALUES ($1, $2) RETURNING *', ['Advogado 1', 'advogado1@example.com']);
        const { id } = result.rows[0];

        // Chame o método excluir do modelo Advogado
        await Advogado.excluir(id);

        // Verifique se o advogado foi excluído corretamente (não deve estar mais no banco de dados)
        const result2 = await client.query('SELECT * FROM advogados WHERE id = $1', [id]);
        expect(result2.rowCount).toBe(0);
    });
});
