const { Knex } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        skuTable(knex),
        SellingType(knex),
        ProductsTable(knex),
        Stock(knex)
    ])
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("sku")
        .dropTable("sellType")
        .dropTable("product")
        .dropTable("stock")
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function skuTable(knex) {
    return knex.schema.createTable("sku", (qb) => {
        qb.string("skuCode").primary().comment("the custom generated sku code"),
            qb.string("name").notNullable().unique(),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("deletedAt")
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function SellingType(knex) {
    const valueCol = "type of selling type values [GRAM,PEICE]"

    return knex.schema.createTable("sellType", (qb) => {
        qb.increments("id"),
            qb.string("value", 10).notNullable().unique().comment(valueCol),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("deletedAt")
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function ProductsTable(knex) {
    return knex.schema.createTable("product", (qb) => {
        qb.increments("id"),
            qb.string("skuCode").notNullable().references("skuCode").inTable("sku").onDelete("SET NULL"),
            qb.string("name").notNullable().unique(),
            qb.string("sellingType", 10).references("value").inTable("sellType").notNullable(),
            qb.decimal("productPrice", 8, 2).notNullable(),
            qb.decimal("sellingPrice", 8, 2).notNullable(),
            qb.string("image"),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("updatedAt"),
            qb.dateTime("deletedAt")
    });
}




/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function Stock(knex) {
    return knex.schema.createTable("stock", (qb) => {
        qb.increments("id"),
            qb.integer("productId").references("id").inTable("product"),
            qb.string("name").notNullable().unique()
                .comment("name column is a cache purpose. so update when product changes"),
            qb.integer("quantity").notNullable(),
            qb.dateTime("createdAt").defaultTo(knex.fn.now(6)),
            qb.dateTime("updatedAt"),
            qb.dateTime("deletedAt")
    });
}
