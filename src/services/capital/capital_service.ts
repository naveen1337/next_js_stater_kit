import knex from "knex";
import { qb } from "../../config/db_config";

export async function addCapital(connection: any, payload: any): Promise<any> {
    try {
        const query = qb('capital').insert({ ...payload }).returning('pk_id').toString()
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

export async function listCapitolRows(connection: any): Promise<any> {
    try {
        const query = qb.select().from("capital").toString()
        const result = await connection.query(query)
        if (result.rows) {
            return [result.rows, null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}

export async function hardDeleteRows(connection: any, rowId: any): Promise<any> {
    try {
        const query = qb("capital").where("pk_id",rowId).delete().returning("pk_id").toString()
        const result = await connection.query(query)
        console.log(result)
        if(result.rows.length ===0){
            return [null, 'no rows found to delete']
        }
        if (result.rows.length >0) {
            return [result.rows, null]
        }
        return [null, "unhandled service"]
    }
    catch (err) {
        console.log(err)
        return [null, "unhandled exception"]
    }
}