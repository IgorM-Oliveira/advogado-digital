/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("clientes", function (table) {
        table.increments("id").primary();
        table.integer("id_estado").references("id").inTable("estados");
        table.integer("id_cidade").references("id").inTable("cidades");
        table.string("nome");
        table.integer("contato");
        table.string("logradouro");
        table.string("endereco");
        table.integer("numberEnde");
        table.date("dataNasc");
        table.integer("tipo");
        table.integer("processo_id").references("id").inTable("processos");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("clientes");
};
