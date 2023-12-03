import knex from "knex";
import { qb } from "../../config/db_config";

export async function addSector(connection: any, payload: any): Promise<any> {
    try {
        const isExists = await connection.query(
            qb('sector_name').from("sector").toString()
        )
        if (isExists.rows.length !== 0) {
            return [null, 'sector_name already exists']
        }

        const query = qb('sector').insert({ ...payload }).returning('pk_id').toString()
        const insert = await connection.query(query)
        if (insert.rows) {
            return [insert.rows[0], null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}

export async function updateWatchList(connection: any, payload: any): Promise<any> {
    try {
        const isExists = await connection.query(
            qb('stock_id').from("watch_list").toString()
        )
        if (payload.action === "ADD" && isExists.rows.length !== 0) {
            return [null, 'already in a watchlist']
        }
        if (payload.action === "REMOVE" && isExists.rows.length === 0) {
            return [null, 'not found in a watchlist']
        }
        const query = qb('watch_list').insert({
            stock_id: payload.stock_id,
            buy_target: payload.buy_target,
            exit_target: payload.exit_target,
        }).returning('stock_id').toString()

        const insert = await connection.query(query)
        if (insert.rows) {
            return [insert.rows[0], null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}

export async function listStocks(connection: any): Promise<any> {
    try {
        const query = qb().from("stocks").toString()
        const response = await connection.query(query)
        if (response.rows) {
            return [response.rows, null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}

export async function listWatchlist(connection: any): Promise<any> {
    try {
        const query = qb().from("watch_list").toString()
        const response = await connection.query(query)
        if (response.rows) {
            return [response.rows, null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}

export async function addStock(connection: any, payload: any): Promise<any> {
    try {
        const isExists = await connection.query(
            qb('ticker').from("stocks").toString()
        )
        if (isExists.rows.length !== 0) {
            return [null, 'ticker already exists']
        }
        const query = qb('stocks').insert({ ...payload }).returning('pk_id').toString()
        const insert = await connection.query(query)
        if (insert.rows) {
            return [insert.rows[0], null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}

export async function hardDeleteStock(connection: any, rowId: any): Promise<any> {
    try {
        const query = qb("capital").where("pk_id", rowId).delete().returning("pk_id").toString()
        const result = await connection.query(query)
        console.log(result)
        if (result.rows.length === 0) {
            return [null, 'no rows found to delete']
        }
        if (result.rows.length > 0) {
            return [result.rows, null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}