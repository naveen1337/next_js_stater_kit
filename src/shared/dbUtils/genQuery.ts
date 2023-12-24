import knex, { Knex } from "knex";
import { fnRtrnCodes, getFnReturn } from "../appUtils/response";
import { genQueryCodes } from "../../config/errCodes"
import dbConnection, { qb } from "../../config/db_config";

export async function getRowsWithWhere(
    connection: typeof dbConnection,
    { tbl, select, whereCol, whereValue, limit }: any) {
    const eCode = genQueryCodes["getRowsWithWhere"]
    try {
        let query = qb(tbl).select(select).from(tbl)
        if (whereCol) {
            query.where(whereCol, whereValue)
        }
        if (limit) {
            query.limit(limit)
        }

        let finalQuery = query.toString()

        const result = await connection.query(finalQuery)
        if (result.rowCount === 0) {
            return getFnReturn(fnRtrnCodes.NOT_FOUND, null, null)
        }
        if (result.rowCount >= 0) {
            return getFnReturn(fnRtrnCodes.OK, result.rows, null)
        }
        throw new Error("unhandled")
    } catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.EXCEPTION, null, eCode + '99')
    }
}


export async function uniqueConstraintCheck(
    connection: typeof dbConnection,
    {
        tbl,
        select,
        whereCol,
        whereValue,
        input
    }: any) {
    const eCode = genQueryCodes["uniqueConstraintCheck"]
    try {
        let query = qb(tbl).select(select).from(tbl)
        if (whereCol) {
            query.where(whereCol, whereValue)
        }

        let finalQuery = query.toString()

        const result = await connection.query(finalQuery)
        if (result.rowCount === 0) {
            return getFnReturn(fnRtrnCodes.OK, null, null)
        }
        const errors: string[] = []
        if (result.rowCount >= 0) {
            result.rows.forEach(row => {
                Object.keys(input).forEach(itemKey => {
                    if (input[itemKey] === row[itemKey]) {
                        errors.push(itemKey)
                    }
                })
            })
        }
        if (errors.length === 0) {
            return getFnReturn(fnRtrnCodes.OK, null, 'no duplicates')
        } else {
            const duplicateKeys = errors.join(",")
            return getFnReturn(fnRtrnCodes.FAIL, errors, `${duplicateKeys} are already exists`)
        }
    } catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.EXCEPTION, null, eCode + '99')
    }
}

export async function insertRow(connection: typeof dbConnection, tbl: string, values: any, returning: string[]) {
    const eCode = genQueryCodes["insertRow"]
    try {
        const query = qb(tbl).insert(values).returning(returning).toString()
        const result = await connection.query(query)
        return getFnReturn(fnRtrnCodes.OK, result, null)
    } catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.EXCEPTION, null, eCode + '99')
    }
}