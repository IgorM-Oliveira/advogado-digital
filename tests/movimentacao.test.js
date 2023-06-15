const Movimentacao = require('../models/movimentacaoModel');
const { client } = require('../config/db');

describe('Movimentacao', () => {
    beforeAll(async () => {
        // Antes de executar os testes, conecte-se ao banco de dados
        await client.connect();
    });

    afterAll(async () => {
        // Após executar os testes, desconecte-se do banco de dados
        await client.end();
    });

    beforeEach(async () => {
        // Antes de cada teste, limpe a tabela de movimentacoes
        await client.query('DELETE FROM movimentacoes');
    });

    test('Deve retornar a lista de movimentacoes corretamente', async () => {
        // Insira algumas movimentacoes de teste no banco de dados
        await client.query('INSERT INTO movimentacoes (codigo, instancia, tipo, local_mov, status, processo_id) VALUES ($1, $2, $3, $4, $5, $6)', [1, 'Instancia 1', 1, 'Local 1', 'Status 1', 1]);
        await client.query('INSERT INTO movimentacoes (codigo, instancia, tipo, local_mov, status, processo_id) VALUES ($1, $2, $3, $4, $5, $6)', [2, 'Instancia 2', 2, 'Local 2', 'Status 2', 2]);

        // Chame o método listarTodos do modelo Movimentacao
        const movimentacoes = await Movimentacao.listarTodos();

        // Verifique se a lista de movimentacoes retornada é a esperada
        expect(movimentacoes.length).toBe(2);
        expect(movimentacoes[0].codigo).toBe(1);
        expect(movimentacoes[0].instancia).toBe('Instancia 1');
        expect(movimentacoes[0].tipo).toBe(1);
        expect(movimentacoes[0].local_mov).toBe('Local 1');
        expect(movimentacoes[0].status).toBe('Status 1');
        expect(movimentacoes[0].processo_id).toBe(1);
        expect(movimentacoes[1].codigo).toBe(2);
        expect(movimentacoes[1].instancia).toBe('Instancia 2');
        expect(movimentacoes[1].tipo).toBe(2);
        expect(movimentacoes[1].local_mov).toBe('Local 2');
        expect(movimentacoes[1].status).toBe('Status 2');
        expect(movimentacoes[1].processo_id).toBe(2);
    });

    test('Deve obter uma movimentacao pelo ID corretamente', async () => {
        // Insira uma movimentacao de teste no banco de dados
        const result = await client.query('INSERT INTO movimentacoes (codigo, instancia, tipo, local_mov, status, processo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [1, 'Instancia 1', 1, 'Local 1', 'Status 1', 1]);
        const { id } = result.rows[0];

        // Chame o método obterPorId do modelo Movimentacao
        const movimentacao = await Movimentacao.obterPorId(id);

        // Verifique se a movimentacao retornada é a esperada
        expect(movimentacao.codigo).toBe(1);
        expect(movimentacao.instancia).toBe('Instancia 1');
        expect(movimentacao.tipo).toBe(1);
        expect(movimentacao.local_mov).toBe('Local 1');
        expect(movimentacao.status).toBe('Status 1');
        expect(movimentacao.processo_id).toBe(1);
    });

    test('Deve criar uma nova movimentacao corretamente', async () => {
        // Chame o método criar do modelo Movimentacao
        const novaMovimentacao = await Movimentacao.criar({
            codigo: 1,
            instancia: 'Instancia 1',
            tipo: 1,
            local_mov: 'Local 1',
            status: 'Status 1',
            processo_id: 1,
        });

        // Verifique se a movimentacao retornada é a esperada
        expect(novaMovimentacao.codigo).toBe(1);
        expect(novaMovimentacao.instancia).toBe('Instancia 1');
        expect(novaMovimentacao.tipo).toBe(1);
        expect(novaMovimentacao.local_mov).toBe('Local 1');
        expect(novaMovimentacao.status).toBe('Status 1');
        expect(novaMovimentacao.processo_id).toBe(1);
    });

    test('Deve atualizar uma movimentacao corretamente', async () => {
        // Insira uma movimentacao de teste no banco de dados
        const result = await client.query('INSERT INTO movimentacoes (codigo, instancia, tipo, local_mov, status, processo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [1, 'Instancia 1', 1, 'Local 1', 'Status 1', 1]);
        const { id } = result.rows[0];

        // Chame o método atualizar do modelo Movimentacao
        const movimentacaoAtualizada = await Movimentacao.atualizar(id, {
            codigo: 2,
            instancia: 'Instancia 2',
            tipo: 2,
            local_mov: 'Local 2',
            status: 'Status 2',
            processo_id: 2,
        });

        // Verifique se a movimentacao atualizada é a esperada
        expect(movimentacaoAtualizada.id).toBe(id);
        expect(movimentacaoAtualizada.codigo).toBe(2);
        expect(movimentacaoAtualizada.instancia).toBe('Instancia 2');
        expect(movimentacaoAtualizada.tipo).toBe(2);
        expect(movimentacaoAtualizada.local_mov).toBe('Local 2');
        expect(movimentacaoAtualizada.status).toBe('Status 2');
        expect(movimentacaoAtualizada.processo_id).toBe(2);
    });

    test('Deve excluir uma movimentacao corretamente', async () => {
        // Insira uma movimentacao de teste no banco de dados
        const result = await client.query('INSERT INTO movimentacoes (codigo, instancia, tipo, local_mov, status, processo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [1, 'Instancia 1', 1, 'Local 1', 'Status 1', 1]);
        const { id } = result.rows[0];

        // Chame o método excluir do modelo Movimentacao
        const movimentacaoExcluida = await Movimentacao.excluir(id);

        // Verifique se a movimentacao excluída é a esperada
        expect(movimentacaoExcluida.id).toBe(id);
        expect(movimentacaoExcluida.codigo).toBe(1);
        expect(movimentacaoExcluida.instancia).toBe('Instancia 1');
        expect(movimentacaoExcluida.tipo).toBe(1);
        expect(movimentacaoExcluida.local_mov).toBe('Local 1');
        expect(movimentacaoExcluida.status).toBe('Status 1');
        expect(movimentacaoExcluida.processo_id).toBe(1);
    });
});
