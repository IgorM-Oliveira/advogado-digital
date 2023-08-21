/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('partes').del()
  await knex('partes').insert([
    {tipo: 1, nome: 'Parte A', contato: 11111111, email: 'partea@example.com', processo_id: 1},
    {tipo: 2, nome: 'Parte B', contato: 22222222, email: 'parteb@example.com', processo_id: 2},
    {tipo: 1, nome: 'Parte C', contato: 33333333, email: 'partec@example.com', processo_id: 3},
  ]);
};
