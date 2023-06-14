const Cliente = require('../models/clienteModel');
const { client } = require('../config/db');

describe('Cliente', () => {
    beforeAll(async () => {
        // Antes de executar os testes, conecte-se ao banco de dados
        await client.connect();
    });

    afterAll(async () => {
        // Após executar os testes, desconecte-se do banco de dados
        await client.end();
    });

    beforeEach(async () => {
        // Antes de cada teste, limpe a tabela de clientes
        await client.query('DELETE FROM clientes');
    });

    test('Deve retornar a lista de clientes corretamente', async () => {
        // Insira alguns clientes de teste no banco de dados
        await client.query('INSERT INTO clientes (nome, email) VALUES ($1, $2)', ['Cliente 1', 'cliente1@example.com']);
        await client.query('INSERT INTO clientes (nome, email) VALUES ($1, $2)', ['Cliente 2', 'cliente2@example.com']);

        // Chame o método listarTodos do modelo Cliente
        const clientes = await Cliente.listarTodos();

        // Verifique se a lista de clientes retornada é a esperada
        expect(clientes.length).toBe(2);
        expect(clientes[0].nome).toBe('Cliente 1');
        expect(clientes[0].email).toBe('cliente1@example.com');
        expect(clientes[1].nome).toBe('Cliente 2');
        expect(clientes[1].email).toBe('cliente2@example.com');
    });

    test('Deve obter um cliente pelo ID corretamente', async () => {
        // Insira um cliente de teste no banco de dados
        const result = await client.query('INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *', ['Cliente 1', 'cliente1@example.com']);
        const { id } = result.rows[0];

        // Chame o método obterPorId do modelo Cliente
        const cliente = await Cliente.obterPorId(id);

        // Verifique se o cliente retornado é o esperado
        expect(cliente.id).toBe(id);
        expect(cliente.nome).toBe('Cliente 1');
        expect(cliente.email).toBe('cliente1@example.com');
    });

    test('Deve criar um novo cliente corretamente', async () => {
        const novoCliente = {
            nome: 'Cliente 1',
            email: 'cliente1@example.com',
        };

        // Chame o método criar do modelo Cliente
        const clienteCriado = await Cliente.criar(novoCliente);

        // Verifique se o cliente foi criado corretamente
        expect(clienteCriado.nome).toBe('Cliente 1');
        expect(clienteCriado.email).toBe('cliente1@example.com');

        // Verifique se o cliente está presente no banco de dados
        const result = await client.query('SELECT * FROM clientes WHERE id = $1', [clienteCriado.id]);
        expect(result.rowCount).toBe(1);
    });

    test('Deve atualizar um cliente corretamente', async () => {
        // Insira um cliente de teste no banco de dados
        const result = await client.query('INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *', ['Cliente 1', 'cliente1@example.com']);
        const { id } = result.rows[0];

        const dadosAtualizados = {
            nome: 'Cliente Atualizado',
            email: 'cliente_atualizado@example.com',
        };

        // Chame o método atualizar do modelo Cliente
        const clienteAtualizado = await Cliente.atualizar(id, dadosAtualizados);

        // Verifique se o cliente foi atualizado corretamente
        expect(clienteAtualizado.id).toBe(id);
        expect(clienteAtualizado.nome).toBe('Cliente Atualizado');
        expect(clienteAtualizado.email).toBe('cliente_atualizado@example.com');
    });

    test('Deve excluir um cliente corretamente', async () => {
        // Insira um cliente de teste no banco de dados
        const result = await client.query('INSERT INTO clientes (nome, email) VALUES ($1, $2) RETURNING *', ['Cliente 1', 'cliente1@example.com']);
        const { id } = result.rows[0];

        // Chame o método excluir do modelo Cliente
        await Cliente.excluir(id);

        // Verifique se o cliente foi excluído corretamente (não deve estar mais no banco de dados)
        const result2 = await client.query('SELECT * FROM clientes WHERE id = $1', [id]);
        expect(result2.rowCount).toBe(0);
    });
});
