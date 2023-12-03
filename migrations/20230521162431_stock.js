/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return Promise.all([
        capital(knex),
        sector(knex),
        stocks(knex),
        watchList(knex),
        holding(knex),
        transaction(knex)
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTable("capital")
        .dropTable("watch_list")
        .dropTable("holding")
        .dropTable("transaction")
        .dropTable("stocks")
        .dropTable("sector")
    };

function capital(knex){
    return knex.schema.createTable("capital",(qb)=>{
        qb.increments("pk_id"),
        qb.integer("amount").notNullable(),
        qb.boolean("from_reserve").notNullable(),  // change into col namne "from_reserve"
        qb.string("via").notNullable()
        qb.string("t_id")
        qb.dateTime("created_at").notNullable().defaultTo(knex.fn.now())
    })
}

function sector(knex){
    return knex.schema.createTable("sector",(qb)=>{
        qb.increments("pk_id"),
        qb.string("sector_name").unique().notNullable()
        qb.string("desc")
    })
}

function stocks(knex) {
    return knex.schema.createTable("stocks", (qb) => {
        qb.increments("pk_id"),
            qb.string("ticker").notNullable().index().unique(),
            qb.string("stock_name").notNullable().unique(),
            qb.integer("ltp_price").notNullable(),
            qb.integer("sector_id").references("pk_id").inTable("sector").index(),
            qb.dateTime("created_at").notNullable().defaultTo(knex.fn.now()),
            qb.dateTime("updated_at");
    });
}

function watchList(knex) {
    return knex.schema.createTable("watch_list", (qb) => {
            qb.integer("stock_id").primary().references("pk_id").inTable("stocks"),
            qb.integer("buy_target").notNullable().defaultTo(0),
            qb.integer("exit_target").notNullable().defaultTo(0),
            qb.dateTime("created_at").notNullable().defaultTo(knex.fn.now()),
            qb.dateTime("updated_at");
    });
}

function holding(knex) {
    return knex.schema.createTable("holding", (qb) => {
            qb.integer("stock_id").primary().references("pk_id").inTable("stocks"),
            qb.integer("quantity").notNullable(),
            qb.integer("average_price").notNullable(),
            qb.boolean("is_intraday").notNullable(),
            qb.integer("current_value").notNullable(),
            qb.dateTime("created_at").notNullable().defaultTo(knex.fn.now()),
            qb.dateTime("updated_at");
    });
}

function transaction(knex) {
    return knex.schema.createTable("transaction", (qb) => {
            qb.increments("pk_id"),
            qb.integer("stock_id").notNullable().references("pk_id").inTable("stocks"),
            qb.string("ticker").notNullable(),
            qb.integer("count").notNullable(),
            qb.integer("price").notNullable(),
            qb.boolean("is_sell").notNullable(),
            qb.integer("pl_value"),
            qb.integer("txn_charges"),
            qb.text("desc").notNullable(),
            qb.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
    });
}
