const Partes = require('../models/parteModel');
const { client } = require('../config/db');

describe('Partes', () => {
    beforeAll(async () => {
        // Antes de executar os testes, conecte-se ao banco de dados
        await client.connect();
    });

    afterAll(async () => {
        // Após executar os testes, desconecte-se do banco de dados
        await client.end();
    });

    beforeEach(async () => {
        // Antes de cada teste, limpe a tabela de partes
        await client.query('DELETE FROM partes');
    });

    test('Deve retornar a lista de partes corretamente', async () => {
        // Insira algumas partes de teste no banco de dados
        await client.query('INSERT INTO partes (tipo, nome, contato, email, processo_id) VALUES ($1, $2, $3, $4, $5)', [1, 'Parte 1', 123456789, 'parte1@example.com', 1]);
        await client.query('INSERT INTO partes (tipo, nome, contato, email, processo_id) VALUES ($1, $2, $3, $4, $5)', [2, 'Parte 2', 987654321, 'parte2@example.com', 1]);

        // Chame o método listarTodos do modelo Partes
        const partes = await Partes.listarTodos();

        // Verifique se a lista de partes retornada é a esperada
        expect(partes.length).toBe(2);
        expect(partes[0].tipo).toBe(1);
        expect(partes[0].nome).toBe('Parte 1');
        expect(partes[0].contato).toBe(123456789);
        expect(partes[0].email).toBe('parte1@example.com');
        expect(partes[0].processo_id).toBe(1);
        expect(partes[1].tipo).toBe(2);
        expect(partes[1].nome).toBe('Parte 2');
        expect(partes[1].contato).toBe(987654321);
        expect(partes[1].email).toBe('parte2@example.com');
        expect(partes[1].processo_id).toBe(1);
    });

    test('Deve obter uma parte pelo ID corretamente', async () => {
        // Insira uma parte de teste no banco de dados
        const result = await client.query('INSERT INTO partes (tipo, nome, contato, email, processo_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [1, 'Parte 1', 123456789, 'parte1@example.com', 1]);
        const { id } = result.rows[0];

        // Chame o método obterPorId do modelo Partes
        const parte = await Partes.obterPorId(id);

        // Verifique se a parte retornada é a esperada
        expect(parte.id).toBe(id);
        expect(parte.tipo).toBe(1);
        expect(parte.nome).toBe('Parte 1');
        expect(parte.contato).toBe(123456789);
        expect(parte.email).toBe('parte1@example.com');
        expect(parte.processo_id).toBe(1);
    });

    test('Deve criar uma nova parte corretamente', async () => {
        const novaParte = {
            tipo: 1,
            nome: 'Parte 1',
            contato: 123456789,
            email: 'parte1@example.com',
            processo_id: 1,
        };

        // Chame o método criar do modelo Partes
        const parteCriada = await Partes.criar(novaParte);

        // Verifique se a parte foi criada corretamente
        expect(parteCriada.tipo).toBe(1);
        expect(parteCriada.nome).toBe('Parte 1');
        expect(parteCriada.contato).toBe(123456789);
        expect(parteCriada.email).toBe('parte1@example.com');
        expect(parteCriada.processo_id).toBe(1);

        // Verifique se a parte está presente no banco de dados
        const result = await client.query('SELECT * FROM partes WHERE id = $1', [parteCriada.id]);
        expect(result.rowCount).toBe(1);
    });

    test('Deve atualizar uma parte corretamente', async () => {
        // Insira uma parte de teste no banco de dados
        const result = await client.query('INSERT INTO partes (tipo, nome, contato, email, processo_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [1, 'Parte 1', 123456789, 'parte1@example.com', 1]);
        const { id } = result.rows[0];

        const dadosAtualizados = {
            tipo: 2,
            nome: 'Parte Atualizada',
            contato: 987654321,
            email: 'parte_atualizada@example.com',
            processo_id: 1,
        };

        // Chame o método atualizar do modelo Partes
        const parteAtualizada = await Partes.atualizar(id, dadosAtualizados);

        // Verifique se a parte foi atualizada corretamente
        expect(parteAtualizada.id).toBe(id);
        expect(parteAtualizada.tipo).toBe(2);
        expect(parteAtualizada.nome).toBe('Parte Atualizada');
        expect(parteAtualizada.contato).toBe(987654321);
        expect(parteAtualizada.email).toBe('parte_atualizada@example.com');
        expect(parteAtualizada.processo_id).toBe(1);
    });

    test('Deve excluir uma parte corretamente', async () => {
        // Insira uma parte de teste no banco de dados
        const result = await client.query('INSERT INTO partes (tipo, nome, contato, email, processo_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [1, 'Parte 1', 123456789, 'parte1@example.com', 1]);
        const { id } = result.rows[0];

        // Chame o método excluir do modelo Partes
        const parteExcluida = await Partes.excluir(id);

        // Verifique se a parte foi excluída corretamente (não deve estar mais no banco de dados)
        const result2 = await client.query('SELECT * FROM partes WHERE id = $1', [id]);
        expect(result2.rowCount).toBe(0);

        // Verifique se a parte excluída é a esperada
        expect(parteExcluida.id).toBe(id);
        expect(parteExcluida.tipo).toBe(1);
        expect(parteExcluida.nome).toBe('Parte 1');
        expect(parteExcluida.contato).toBe(123456789);
        expect(parteExcluida.email).toBe('parte1@example.com');
        expect(parteExcluida.processo_id).toBe(1);
    });
});
