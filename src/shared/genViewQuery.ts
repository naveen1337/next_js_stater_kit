import { qb } from "../config/db_config";
import knex from "knex"


export function genViewQuery(payload: any) {
    try {

        let sqlQuery = `CREATE TABLE ${payload.viewName} (`
        for (const column of payload.columns) {
            if (column.type === "AUTO_INCREMENT_PRIMARY") {
                sqlQuery = genAutoIncrementPrimary(sqlQuery,column);
            }
            if (column.type === "STRING") {
                sqlQuery = genStringColumn(sqlQuery,column)
            }
            if (column.type === "DATETIME") {
                sqlQuery = genDateTimeColumn(sqlQuery,column)
            }
        }
        return genLastPartSql(sqlQuery)
    } catch (err) {
        console.log(err)
        return err
    }
}


function genAutoIncrementPrimary(sqlQuery: string, column: any) {
    sqlQuery += `${column.identifier} SERIAL PRIMARY KEY `;
    return sqlQuery += `, `;
}

function genStringColumn(sqlQuery: string, column: any) {
    sqlQuery += `${column.identifier} VARCHAR (${column.constraint.maxLength}) `;
    if (column.constraint.required) {
        sqlQuery += `NOT NULL`;
    }
    return sqlQuery += `, `;
}

function genDateTimeColumn(sqlQuery: string, column: any) {
    sqlQuery += `${column.identifier} TIMESTAMP `;
    if (column.constraint.required) {
        sqlQuery += `NOT NULL`;
    }
    return sqlQuery += `, `;
}


function genLastPartSql(sqlQuery: string) {
    let arr = sqlQuery.split(",")
    arr.splice(arr.length - 1, 1)
    sqlQuery = arr.join(',')
    sqlQuery += `)`
    return sqlQuery
}


// create table \"test1\" (\"id\" serial primary key, \"sku\" varchar(10), \"desc\" varchar(100))"