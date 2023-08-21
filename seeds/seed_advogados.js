/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('advogados').del()
  await knex('advogados').insert([
    {id_estado: 1, id_cidade: 1, nome: 'João Silva', contato: 99999999, logradouro: 'Rua A', endereco: '123', numberEnde: 10, numAdv: '1234', senha: 'senha123', estadLogin: 'ativo', dataCadastro: '2022-01-01', areas: 'Criminal', processo_id: 1},
    {id_estado: 1, id_cidade: 2, nome: 'Maria Santos', contato: 88888888, logradouro: 'Rua B', endereco: '456', numberEnde: 20, numAdv: '5678', senha: 'senha456', estadLogin: 'inativo', dataCadastro: '2022-02-01', areas: 'Trabalhista', processo_id: NULL},
    {id_estado: 2, id_cidade: 3, nome: 'Pedro Souza', contato: 77777777, logradouro: 'Rua C', endereco: '789', numberEnde: 30, numAdv: '91011', senha: 'senha789', estadLogin: 'ativo', dataCadastro: '2022-03-01', areas: 'Civil', processo_id: 2},
  ]);
};
