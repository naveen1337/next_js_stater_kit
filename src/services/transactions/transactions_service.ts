import knex from "knex";
import { qb } from "../../config/db_config";

export async function addHolding(connection: any, payload: any): Promise<any> {
    try {
        const insertObj = {
            stock_id: payload.stock_id,
            quantity: payload.quantity,
            average_price: payload.average_price,
            is_intraday:payload.is_intraday,
            current_value:payload.current_value
        }
        const isExists = await connection.query(
            qb.select("pk_id").from("stocks").where("pk_id", insertObj.stock_id).toString()
        )
        if (isExists.rows.length == 0) {
            return [null, 'stock is not found']
        }

        const query = qb('holding').insert(insertObj).returning('stock_id').toString()
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

export async function listHoldings(connection: any): Promise<any> {
    try {
        const query = qb().from("holding").toString()
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