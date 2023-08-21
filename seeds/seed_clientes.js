/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clientes').del()
  await knex('clientes').insert([
    {id_estado: 1, id_cidade: 1, nome: 'Ana Oliveira', contato: 66666666, logradouro: 'Rua X', endereco: '987', numberEnde: 40, dataNasc: '1990-01-01', tipo: 1, processo_id: 1},
    {id_estado: 2, id_cidade: 4, nome: 'Carlos Rodrigues', contato: 55555555, logradouro: 'Rua Y', endereco: '654', numberEnde: 50, dataNasc: '1985-02-01', tipo: 2, processo_id: NULL},
    {id_estado: 3, id_cidade: 6, nome: 'Mariana Santos', contato: 44444444, logradouro: 'Rua Z', endereco: '321', numberEnde: 60, dataNasc: '2000-03-01', tipo: 1, processo_id: 3},
  ]);
};
