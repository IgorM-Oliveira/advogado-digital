const Processo = require('../models/processoModel');
const { client } = require('../config/db');

describe('Processo', () => {
    beforeAll(async () => {
        // Antes de executar os testes, conecte-se ao banco de dados
        await client.connect();
    });

    afterAll(async () => {
        // Após executar os testes, desconecte-se do banco de dados
        await client.end();
    });

    beforeEach(async () => {
        // Antes de cada teste, limpe a tabela de processos
        await client.query('DELETE FROM processos');
    });

    test('Deve retornar a lista de processos corretamente', async () => {
        // Insira alguns processos de teste no banco de dados
        await client.query('INSERT INTO processos (numero, comanda, tipo) VALUES ($1, $2, $3)', [1, 'Comanda 1', 1]);
        await client.query('INSERT INTO processos (numero, comanda, tipo) VALUES ($1, $2, $3)', [2, 'Comanda 2', 2]);

        // Chame o método listarTodos do modelo Processo
        const processos = await Processo.listarTodos();

        // Verifique se a lista de processos retornada é a esperada
        expect(processos.length).toBe(2);
        expect(processos[0].numero).toBe(1);
        expect(processos[0].comanda).toBe('Comanda 1');
        expect(processos[0].tipo).toBe(1);
        expect(processos[1].numero).toBe(2);
        expect(processos[1].comanda).toBe('Comanda 2');
        expect(processos[1].tipo).toBe(2);
    });

    test('Deve obter um processo pelo ID corretamente', async () => {
        // Insira um processo de teste no banco de dados
        const result = await client.query('INSERT INTO processos (numero, comanda, tipo) VALUES ($1, $2, $3) RETURNING *', [1, 'Comanda 1', 1]);
        const { id } = result.rows[0];

        // Chame o método obterPorId do modelo Processo
        const processo = await Processo.obterPorId(id);

        // Verifique se o processo retornado é o esperado
        expect(processo.id).toBe(id);
        expect(processo.numero).toBe(1);
        expect(processo.comanda).toBe('Comanda 1');
        expect(processo.tipo).toBe(1);
    });

    test('Deve criar um novo processo corretamente', async () => {
        const novoProcesso = {
            numero: 1,
            comanda: 'Comanda 1',
            tipo: 1,
        };

        // Chame o método criar do modelo Processo
        const processoCriado = await Processo.criar(novoProcesso);

        // Verifique se o processo foi criado corretamente
        expect(processoCriado.numero).toBe(1);
        expect(processoCriado.comanda).toBe('Comanda 1');
        expect(processoCriado.tipo).toBe(1);

        // Verifique se o processo está presente no banco de dados
        const result = await client.query('SELECT * FROM processos WHERE id = $1', [processoCriado.id]);
        expect(result.rowCount).toBe(1);
    });

    test('Deve atualizar um processo corretamente', async () => {
        // Insira um processo de teste no banco de dados
        const result = await client.query('INSERT INTO processos (numero, comanda, tipo) VALUES ($1, $2, $3) RETURNING *', [1, 'Comanda 1', 1]);
        const { id } = result.rows[0];

        const dadosAtualizados = {
            numero: 2,
            comanda: 'Comanda 2',
            tipo: 2,
        };

        // Chame o método atualizar do modelo Processo
        const processoAtualizado = await Processo.atualizar(id, dadosAtualizados);

        // Verifique se o processo foi atualizado corretamente
        expect(processoAtualizado.id).toBe(id);
        expect(processoAtualizado.numero).toBe(2);
        expect(processoAtualizado.comanda).toBe('Comanda 2');
        expect(processoAtualizado.tipo).toBe(2);
    });

    test('Deve excluir um processo corretamente', async () => {
        // Insira um processo de teste no banco de dados
        const result = await client.query('INSERT INTO processos (numero, comanda, tipo) VALUES ($1, $2, $3) RETURNING *', [1, 'Comanda 1', 1]);
        const { id } = result.rows[0];

        // Chame o método excluir do modelo Processo
        await Processo.excluir(id);

        // Verifique se o processo foi excluído corretamente (não deve estar mais no banco de dados)
        const result2 = await client.query('SELECT * FROM processos WHERE id = $1', [id]);
        expect(result2.rowCount).toBe(0);
    });
});
