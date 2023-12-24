import { qb } from "../../config/db_config";
import { fnRtrnCodes, getFnReturn } from "../../shared/appUtils/response";
import { genViewQuery } from "../../shared/genViewQuery"


export async function creatView(connection: any, payload: any): Promise<any> {
    try {
        const query = genViewQuery(payload)
        // const result = await connection.query(query)
        return getFnReturn(fnRtrnCodes.SUCCESS, query, null)
    }
    catch (err) {
        console.log(err)
        return getFnReturn(fnRtrnCodes.FAIL, "unhandled creatView", null)
    }
}