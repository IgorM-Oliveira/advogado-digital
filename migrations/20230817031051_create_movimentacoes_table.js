/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("movimentacoes", function (table) {
        table.increments("id").primary();
        table.integer("codigo");
        table.string("instancia");
        table.integer("tipo");
        table.string("local_mov");
        table.string("status");
        table.integer("processo_id").references("id").inTable("processos");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("movimentacoes");
};
