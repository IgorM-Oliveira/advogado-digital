/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('processos').del()
  await knex('processos').insert([
    {numero: 123, comanda: 'Comanda A', tipo: 1},
    {numero: 456, comanda: 'Comanda B', tipo: 2},
    {numero: 789, comanda: 'Comanda C', tipo: 1},
  ]);
};
