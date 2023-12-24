const { Knex } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        viewTable(knex),
      ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("viewInfo")
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
async function viewTable(knex) {
    return knex.schema.createTable("viewInfo", (qb) => {
      qb.string("viewName").primary(),
      qb.string("shortDesc").notNullable(),
      qb.string("longDesc").notNullable(),
      qb.json("columnDefs"),
      qb.timestamps();
    });
}