/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('estados').del()
  await knex('estados').insert([
    {nome: 'Acre'},
    {nome: 'Alagoas'},
    {nome: 'Amapá'},
    {nome: 'Amazonas'},
    {nome: 'Bahia'},
    {nome: 'Ceará'},
    {nome: 'Distrito Federal'},
    {nome: 'Espírito Santo'},
    {nome: 'Goiás'},
    {nome: 'Maranhão'},
    {nome: 'Mato Grosso'},
    {nome: 'Mato Grosso do Sul'},
    {nome: 'Minas Gerais'},
    {nome: 'Pará'},
    {nome: 'Paraíba'},
    {nome: 'Paraná'},
    {nome: 'Pernambuco'},
    {nome: 'Piauí'},
    {nome: 'Rio de Janeiro'},
    {nome: 'Rio Grande do Norte'},
    {nome: 'Rio Grande do Sul'},
    {nome: 'Rondônia'},
    {nome: 'Roraima'},
    {nome: 'Santa Catarina'},
    {nome: 'São Paulo'},
    {nome: 'Sergipe'},
    {nome: 'Tocantins'}
  ]);
};
