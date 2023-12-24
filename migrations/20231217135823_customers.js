/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return Promise.all([
        CustomersTable(knex),
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable("customer")
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function CustomersTable(knex) {
    return knex.schema.createTable("customer", (qb) => {
        qb.increments("id"),
            qb.string("name"),
            qb.string("email"),
            qb.string("phone"),
            qb.string("address"),
            qb.text("info"),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("updatedAt"),
            qb.dateTime("deletedAt")
    });
}