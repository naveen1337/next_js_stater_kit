import { qb } from "../../config/db_config";


export async function aliveCheck(connection: any): Promise<any> {
    try {
        const query = qb.select().from("appControl").toString()
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