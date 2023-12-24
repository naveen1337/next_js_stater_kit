/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        controlTable(knex),
        refConstants(knex)
      ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("appControl")
    .dropTable("refConstants")
};

function controlTable(knex) {
    return knex.schema.createTable("appControl", (qb) => {
      qb.increments("id"),
        qb.boolean("inMaintenance").notNullable().defaultTo(false),
        qb.text("maintenanceText"),
        qb.decimal("version",8,2).notNullable().defaultTo(0.1),
      qb.dateTime("updatedAt");
    });
}

function refConstants(knex) {
  return knex.schema.createTable("refConstant", (qb) => {
      qb.string("refValue").primary(),
      qb.string("refValueCode").notNullable(),
      qb.string("refLabel").notNullable(),
      qb.string("refTable",20).notNullable(),
      qb.string("refColumn",20).notNullable(),
      qb.dateTime("createdAt").defaultTo(knex.fn.now(6))
  });
}


