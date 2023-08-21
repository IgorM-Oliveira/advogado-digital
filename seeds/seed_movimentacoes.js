/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movimentacoes').del()
  await knex('movimentacoes').insert([
    {codigo: 1, instancia: 'Primeira Instância', tipo: 1, local_mov: 'Fórum A', status: 'Em andamento', processo_id: 1},
    {codigo: 2, instancia: 'Segunda Instância', tipo: 2, local_mov: 'Fórum B', status: 'Concluído', processo_id: 2},
    {codigo: 3, instancia: 'Primeira Instância', tipo: 1, local_mov: 'Fórum C', status: 'Em andamento', processo_id: 3},
  ]);
};
