/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        VendorsTable(knex),
        VendorsTransactionTable(knex),
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
    .dropTable("vendors")
    .dropTable("vendorsTxn")
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function VendorsTable(knex) {
    return knex.schema.createTable("vendors", (qb) => {
        qb.increments("id"),
            qb.string("name").notNullable().unique(),
            qb.string("address"),
            qb.string("contact"),
            qb.text("info"),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("updatedAt"),
            qb.dateTime("deletedAt")
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function VendorsTransactionTable(knex) {
    return knex.schema.createTable("vendorsTxn", (qb) => {
        qb.increments("id"),
            qb.integer("vendorId").references("id").inTable("vendors"),
            qb.integer("vendorOrderId").references("id").inTable("vendors"),
            qb.decimal("totalPrice", 8, 2).notNullable(),
            qb.decimal("currentPrice", 8, 2).notNullable(),
            qb.string("status", 30).notNullable(),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("updatedAt"),
            qb.dateTime("deletedAt"),
            knex.raw("CHECK (status LIKE 'VNDR_TXN_%')")
    });
}