/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        controlTable(knex),
      ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("app_control")
};

function controlTable(knex) {
    return knex.schema.createTable("app_control", (qb) => {
      qb.increments("id"),
        qb.boolean("in_maintenance").notNullable().defaultTo(false),
        qb.text("maintenance_text"),
        qb.float("version").notNullable().defaultTo(0.1),
      qb.dateTime("updated_at");
    });
}