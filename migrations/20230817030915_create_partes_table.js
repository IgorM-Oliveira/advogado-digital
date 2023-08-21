/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("partes", function (table) {
        table.increments("id").primary();
        table.integer("tipo");
        table.string("nome");
        table.integer("contato");
        table.string("email");
        table.integer("processo_id").references("id").inTable("processos");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("partes");
};
