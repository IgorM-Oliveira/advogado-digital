/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("advogados", function (table) {
        table.increments("id").primary();
        table.integer("id_estado").references("id").inTable("estados");
        table.integer("id_cidade").references("id").inTable("cidades");
        table.string("nome");
        table.integer("contato");
        table.string("logradouro");
        table.string("endereco");
        table.integer("numberEnde");
        table.string("numAdv");
        table.string("senha");
        table.string("estadLogin");
        table.date("dataCadastro");
        table.string("areas");
        table.integer("processo_id").references("id").inTable("processos");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("advogados");
};
